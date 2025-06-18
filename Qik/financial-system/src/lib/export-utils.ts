export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    // Importar dinámicamente las librerías
    const jsPDF = (await import("jspdf")).default
    const html2canvas = (await import("html2canvas")).default

    const element = document.getElementById(elementId)
    if (!element) {
      console.error("Elemento no encontrado para exportar")
      return
    }

    // Crear canvas del elemento
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/png")

    // Crear PDF
    const pdf = new jsPDF("p", "mm", "a4")
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    // Agregar primera página
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Agregar páginas adicionales si es necesario
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Descargar PDF
    pdf.save(filename)
  } catch (error) {
    console.error("Error al exportar PDF:", error)
    alert("Error al generar el PDF. Por favor, intenta nuevamente.")
  }
}
