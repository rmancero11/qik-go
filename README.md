## qik-go - Sistema contable para negocios
-----

# Funciones PostgreSQL para registrar ventas y compras

## 1. Función para registrar ventas

```sql
CREATE OR REPLACE FUNCTION registrar_venta(
    p_id_movimiento INTEGER,
    p_id_local INTEGER,
    p_id_cliente INTEGER,
    p_id_empleado INTEGER,
    p_id_forma_pago INTEGER,
    p_moneda VARCHAR(3) DEFAULT 'PEN',
    p_monto NUMERIC,
    p_propina NUMERIC DEFAULT 0,
    p_nro_personas INTEGER DEFAULT 1,
    p_mesa VARCHAR(50) DEFAULT '',
    p_id_turno INTEGER DEFAULT NULL,
    p_servicio_mesa NUMERIC DEFAULT 0,
    p_estado VARCHAR(20) DEFAULT 'completada',
    p_satisfaccion INTEGER DEFAULT NULL,
    p_comentario TEXT DEFAULT ''
)
RETURNS JSON AS $$
DECLARE
    v_result JSON;
    v_venta_id INTEGER;
BEGIN
    -- Validaciones básicas
    IF p_monto <= 0 THEN
        RETURN json_build_object('error', 'Monto debe ser un número positivo');
    END IF;
    
    IF p_propina < 0 THEN
        RETURN json_build_object('error', 'Propina debe ser un número positivo o cero');
    END IF;
    
    -- Insertar la venta
    INSERT INTO ventas (
        id_movimiento,
        id_local,
        id_cliente,
        id_empleado,
        nro_personas,
        mesa,
        id_turno,
        servicio_mesa,
        id_forma_pago,
        moneda,
        monto,
        propina,
        estado,
        satisfaccion,
        comentario,
        fecha_registro
    ) VALUES (
        p_id_movimiento,
        p_id_local,
        p_id_cliente,
        p_id_empleado,
        p_nro_personas,
        p_mesa,
        p_id_turno,
        p_servicio_mesa,
        p_id_forma_pago,
        p_moneda,
        p_monto,
        p_propina,
        p_estado,
        p_satisfaccion,
        p_comentario,
        NOW()
    ) RETURNING id_venta INTO v_venta_id;
    
    -- Obtener los datos de la venta registrada
    SELECT row_to_json(t) INTO v_result
    FROM (
        SELECT * FROM ventas WHERE id_venta = v_venta_id
    ) t;
    
    RETURN json_build_object(
        'message', 'Venta registrada exitosamente',
        'id_venta', v_venta_id,
        'data', v_result
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('error', SQLERRM);
END;
$$ LANGUAGE plpgsql;
```

## 2. Función para registrar compras

```sql
CREATE OR REPLACE FUNCTION registrar_compra(
    p_cod_stock INTEGER,
    p_id_local INTEGER,
    p_cantidad NUMERIC,
    p_moneda VARCHAR(3) DEFAULT 'PEN',
    p_monto NUMERIC,
    p_nro_factura VARCHAR(50),
    p_fecha_pago DATE,
    p_forma_pago VARCHAR(20) DEFAULT 'CONTADO',
    p_id_movimiento INTEGER DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    v_result JSON;
    v_compra_id INTEGER;
BEGIN
    -- Validaciones básicas
    IF p_monto <= 0 THEN
        RETURN json_build_object('error', 'Monto debe ser un número positivo');
    END IF;
    
    IF p_cantidad <= 0 THEN
        RETURN json_build_object('error', 'Cantidad debe ser un número positivo');
    END IF;
    
    IF NOT p_nro_factura ~ '^[A-Za-z0-9\-]+$' THEN
        RETURN json_build_object('error', 'Número de factura no válido');
    END IF;
    
    -- Validar formas de pago permitidas
    IF p_forma_pago NOT IN ('CONTADO', 'CRÉDITO', 'TRANSFERENCIA', 'EFECTIVO') THEN
        RETURN json_build_object('error', 'Forma de pago no válida');
    END IF;
    
    -- Insertar la compra
    INSERT INTO pagos_insumos (
        cod_stock,
        id_local,
        cantidad,
        moneda,
        monto,
        nro_factura,
        fecha_pago,
        forma_pago,
        id_movimiento,
        fecha_registro
    ) VALUES (
        p_cod_stock,
        p_id_local,
        p_cantidad,
        p_moneda,
        p_monto,
        p_nro_factura,
        p_fecha_pago,
        p_forma_pago,
        p_id_movimiento,
        NOW()
    ) RETURNING id_movimiento INTO v_compra_id;
    
    -- Obtener los datos de la compra registrada
    SELECT row_to_json(t) INTO v_result
    FROM (
        SELECT * FROM pagos_insumos WHERE id_movimiento = v_compra_id
    ) t;
    
    RETURN json_build_object(
        'message', 'Compra registrada exitosamente',
        'id_compra', v_compra_id,
        'data', v_result
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('error', SQLERRM);
END;
$$ LANGUAGE plpgsql;
```

# Cómo llamar a estas funciones desde JavaScript:

```javascript
// Registrar una venta
const { data, error } = await supabase
  .rpc('registrar_venta', {
    p_id_movimiento: 123,
    p_id_local: 1,
    p_id_cliente: 456,
    p_id_empleado: 789,
    p_id_forma_pago: 1,
    p_moneda: 'PEN',
    p_monto: 150.50,
    p_propina: 15.00,
    p_nro_personas: 4,
    p_mesa: 'Mesa 5',
    p_comentario: 'Buena atención'
  });

// Registrar una compra
const { data, error } = await supabase
  .rpc('registrar_compra', {
    p_cod_stock: 101,
    p_id_local: 1,
    p_cantidad: 10,
    p_moneda: 'PEN',
    p_monto: 1500.50,
    p_nro_factura: 'F-2023-001',
    p_fecha_pago: '2023-11-15',  // Formato YYYY-MM-DD
    p_forma_pago: 'CONTADO'
  });
```

## Ventajas de este enfoque

1. **Mayor seguridad**: La lógica de negocio está en la base de datos, no expuesta en el cliente.
2. **Mejor rendimiento**: Menos tráfico de red ya que las validaciones ocurren en el servidor.
3. **Consistencia**: Misma lógica aplicada sin importar desde dónde se llame a la función.
4. **Mantenibilidad**: Cambios en la lógica solo requieren actualizar la función en la base de datos.





### 🔍 Ejemplo practico: 

Caso para llamar una funcion en Supabase desde Python (Flask). Por ejemplo, presiono un boton para registrar una venta realizada con un monto y fecha, en la base de datos necesito ejecutar una funcion que suma el monto de la venta a la cuenta bancaria. Te muestro cómo hacerlo paso a paso.

### 🔧 Supuesto:

Querés ejecutar una función en Supabase cuando el usuario hace clic en un botón, por ejemplo:

```sql
-- Función en Supabase: registra una venta y actualiza saldo
create or replace function registrar_venta(input json)
returns void
language plpgsql
as $$
declare
  monto numeric;
  fecha date;
begin
  -- Extraer datos del JSON
  monto := (input->>'monto')::numeric;
  fecha := (input->>'fecha')::date;

  -- Registrar la venta
  insert into ventas (monto, fecha) values (monto, fecha);

  -- Actualizar saldo en cuenta bancaria
  update cuenta_bancaria
  set saldo = saldo + monto
  where id = 1;  -- o algún criterio dinámico
end;
$$;
```

---

## ✅ Llamar esa función desde Flask

### 🐍 Flask (Python)

```python
@app.route('/registrar_venta', methods=['POST'])
def registrar_venta():
    data = request.json  # {'monto': 1500, 'fecha': '2025-06-09'}
    try:
        result = supabase.rpc("registrar_venta", params={"input": data}).execute()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

## ✅ Llamar desde el frontend con fetch (JavaScript)

### 🌐 HTML + JavaScript:

```html
<input type="number" id="monto" placeholder="Monto">
<input type="date" id="fecha">
<button onclick="registrarVenta()">Registrar venta</button>

<script>
function registrarVenta() {
  const monto = document.getElementById("monto").value;
  const fecha = document.getElementById("fecha").value;

  fetch("http://localhost:5000/registrar_venta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ monto, fecha })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Venta registrada con éxito");
    } else {
      alert("Error: " + data.error);
    }
  });
}
</script>
```

---

## 🧠 Resumen

| Capa      | Acción                                                      |
| --------- | ----------------------------------------------------------- |
| SQL       | Creás una función que hace múltiples tareas dentro de la BD |
| Flask API | Llama la función vía `.rpc(nombre_función, {param})`        |
| Frontend  | Envia los datos por `fetch()` a tu endpoint Flask           |
