const btnAgregar = document.getElementById("boton")
const fooTer = document.getElementById("fooTer") 
const btnTotal = document.getElementById("total-pagos")
const teFooter = document.getElementById("te-footer")
const totales = document.getElementById('totales')
btnAgregar.onclick = () =>{ capturar() }

const capturar = () => {
   function Pagado(lote,monto){
    this.lote=lote;
    this.monto= parseFloat(monto);
    localStorage.setItem(lote,monto)
  
 
   }
   
   var loteCapturar = document.getElementById("lote").value;
   var montoCapturar = document.getElementById("monto").value;
   
   nuevoElemento = new Pagado (loteCapturar,montoCapturar)
  
     
   agregar()
}

const baseDatos = []
const agregar = () =>{
    baseDatos.push(nuevoElemento)
     document.getElementById("tabla").innerHTML += '<tbody><td>'+nuevoElemento.lote+'</td><td>'+nuevoElemento.monto+'</td></tbody>' 
     
    const nTotal = Object.values(baseDatos).reduce((acc,{monto}) => acc + monto  ,0)
    console.log(nTotal)

    document.getElementById("te-footer").innerHTML +=  '<td class="font-weight-bold" id="totales">$ <span>'+nTotal+'</span></td>'

    
 }

  