from flask import Flask, jsonify, request
from supabase import create_client
import os
from datetime import datetime

app = Flask(__name__)

# Configuración de Supabase
SUPABASE_URL = "https://goxbiqmuyxzwhetthuzd.supabase.co"  # o directamente 'https://<tu-proyecto>.supabase.co'
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdveGJpcW11eXh6d2hldHRodXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTU1NTMsImV4cCI6MjA2MzA5MTU1M30.0-5f3i2OAQ4Ta82G67UuaJ4LSAiJpBaftNh2VqzF-8Y"  # API key (anon o service_role)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/all_tables', methods=['GET'])
def get_all_tables():
    try:
        # Paso 1: Obtener nombres de tablas
        result = supabase.rpc("get_tables", params={}).execute()
        table_names = [row['tablename'] for row in result.data]

        # Paso 2: Crear un diccionario con los datos de cada tabla
        all_data = {}
        for table in table_names:
            table_result = supabase.table(table).select("*").execute()
            all_data[table] = table_result.data

        return jsonify(all_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/ventas', methods=['POST'])
def registrar_venta():
    '''
    Estructura de datos esperada:
    {
        "id_movimiento": 123,
        "id_local": 1,
        "id_cliente": 456,
        "id_empleado": 789,
        "id_forma_pago": 1,
        "moneda": "PEN",
        "monto": 150.50,
        "propina": 15.00,
        "nro_personas": 4,
        "mesa": "Mesa 5",
        "comentario": "Buena atención"
    }
    '''
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        required_fields = [
            'id_movimiento', 'id_local', 'id_cliente', 'id_empleado',
            'id_forma_pago', 'moneda', 'monto', 
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Campo requerido faltante: {field}"}), 400
        
        # Validar tipos de datos básicos
        if not isinstance(data['monto'], (int, float)) or data['monto'] <= 0:
            return jsonify({"error": "Monto debe ser un número positivo"}), 400
        
        if 'propina' in data and (not isinstance(data['propina'], (int, float)) or data['propina'] < 0):
            return jsonify({"error": "Propina debe ser un número positivo o cero"}), 400
        
        # Valores por defecto
        venta_data = {
            "id_movimiento": data['id_movimiento'], # Automatico segun tabla 'movimiento'
            "id_local": data['id_local'],
            "id_cliente": data['id_cliente'], # Numero de DNI
            "id_empleado": data['id_empleado'],
            "nro_personas": data.get('nro_personas', 1),
            "mesa": data.get('mesa', ''), # Este parametro se tiene que completar con la seleccion que haga el usuario en la interfaz
            "id_turno": data.get('id_turno', None), # Automatico segun hora ingresada
            "servicio_mesa": data.get('servicio_mesa', 0),
            "id_forma_pago": data['id_forma_pago'],
            "moneda": data['moneda'], # Dolares por defecto
            "monto": data['monto'],
            "propina": data.get('propina', 0),
            "estado": data.get('estado', 'completada'),
            "satisfaccion": data.get('satisfaccion', None),
            "comentario": data.get('comentario', '')
        }
        
        # Insertar venta en la base de datos
        venta_response = supabase.table('ventas').insert(venta_data).execute()
        
        # Verificar que se insertó correctamente
        if not venta_response.data:
            return jsonify({"error": "No se pudo registrar la venta"}), 500
            
        venta_id = venta_response.data[0]['id_venta']
        
        return jsonify({
            "message": "Venta registrada exitosamente",
            "id_venta": venta_id,
            "data": venta_response.data[0]
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/compras', methods=['POST'])
def registrar_compra():
    '''
    Estructura de datos esperada:
        {
        "cod_stock": 101,
        "id_local": 1,
        "cantidad": 10,
        "moneda": "PEN",
        "monto": 1500.50,
        "nro_factura": "F-2023-001",
        "fecha_pago": "15/11/2023",
        "forma_pago": "CONTADO",
        "id_movimiento": 12345
    }
    '''
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        required_fields = [
            'cod_stock', 'id_local', 'cantidad', 
            'moneda', 'monto', 'nro_factura', 'fecha_pago'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Campo requerido faltante: {field}"}), 400
        
        # Validar formatos
        if not isinstance(data['monto'], (int, float)) or data['monto'] <= 0:
            return jsonify({"error": "Monto debe ser un número positivo"}), 400
            
        if not isinstance(data['cantidad'], (int, float)) or data['cantidad'] <= 0:
            return jsonify({"error": "Cantidad debe ser un número positivo"}), 400
            
        if not re.match(r'^[A-Za-z0-9\-]+$', data['nro_factura']):
            return jsonify({"error": "Número de factura no válido"}), 400
            
        try:
            fecha_pago = datetime.strptime(data['fecha_pago'], '%d/%m/%Y')
        except ValueError:
            return jsonify({"error": "Formato de fecha debe ser dd/mm/yyyy"}), 400
        
        # Validar formas de pago permitidas
        formas_pago_validas = ['CONTADO', 'CRÉDITO', 'TRANSFERENCIA', 'EFECTIVO']
        if 'forma_pago' in data and data['forma_pago'] not in formas_pago_validas:
            return jsonify({"error": f"Forma de pago no válida. Use: {', '.join(formas_pago_validas)}"}), 400
        
        # Preparar datos para insertar
        compra_data = {
            "cod_stock": data['cod_stock'], # Automaticamente se extrae de la tabla 'stock_locales'
            "id_local": data['id_local'],
            "cantidad": data['cantidad'], # Automatico
            "moneda": data['moneda'], # Dolares por defecto
            "monto": data['monto'],
            "nro_factura": data['nro_factura'],
            "fecha_pago": fecha_pago.isoformat(),
            "forma_pago": data.get('forma_pago', 'CONTADO'),
            "id_movimiento": data.get('id_movimiento', None) # Automatico segun tabla 'movimiento'
        }
        
        # Insertar en la base de datos
        compra_response = supabase.table('pagos_insumos').insert(compra_data).execute()
        
        if not compra_response.data:
            return jsonify({"error": "No se pudo registrar la compra"}), 500
            
        return jsonify({
            "message": "Compra registrada exitosamente",
            "id_compra": compra_response.data[0]['id_movimiento'],
            "data": compra_response.data[0]
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
