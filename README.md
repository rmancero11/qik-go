# qik-go
Sistema contable para negocios
-----
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

---

¿Querés que te ayude a diseñar esa tabla `ventas` y la lógica completa de la función en SQL según tu caso real?
