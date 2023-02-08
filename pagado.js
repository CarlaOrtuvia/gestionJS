const items = document.getElementById('items')
const boletos = document.getElementById('boletos')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateBoleto = document.getElementById('template-boleto').content
const fragment = document.createDocumentFragment()
let boleto = {}


document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if (localStorage.getItem('boleto')) {
        boleto = JSON.parse(localStorage.getItem('boleto'))
        pintarBoleto()
    }
})
document.addEventListener('click', e => {
    addBoleto(e)
})

const fetchData = async () => {
    try{
        const res = await fetch('datos.json')
        const data = await res.json()
      
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}
const pintarCards = data => {
  
 data.forEach(elementos => {
        templateCard.querySelector('h3').textContent = elementos.nombre
        templateCard.querySelector('h4').textContent = elementos.lote
        templateCard.querySelector('h5').textContent = elementos.estado
        templateCard.querySelector('.btn-dark').dataset.id = elementos.id     

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
 })
 items.appendChild(fragment)
}

const addBoleto = e => {
  
    if(e.target.classList.contains('btn-dark')){
        setBoleto(e.target.parentElement)
    }
    e.stopPropagation()
}

const setBoleto = objeto => {
 
    const elementos = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        nombre: objeto.querySelector('h3').textContent,
        lote: objeto.querySelector('h4').textContent,
        estado: objeto.querySelector('h5').textContent,
        expOrdinaria : 6500,
        expExtraordinaria : 1500,  
       
        }
      
       
    boleto[elementos.id] = {...elementos}
    pintarBoleto()

}

  
const pintarBoleto = () =>{
    boletos.innerHTML = ''
    Object.values(boleto).forEach(elementos => {
        boletos.innerHTML = `
        <tr>
        <th scope="row">${elementos.id}</th>
        <td>${elementos.nombre}</td>
        <td>${elementos.expOrdinaria}</td>
        <td>${elementos.expExtraordinaria}</td>
            
      </tr> 
          `
          
    })
  
    
    pintarFooter()
     
    localStorage.setItem('boleto', JSON.stringify(boleto))
}

const pintarFooter = () => {
    footer.innerHTML = ''
 if(Object.keys(boleto).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Boleto Vacío</th>
    `
    return
 }
 const nTotal = Object.values(boleto).reduce((acc,{expOrdinaria, expExtraordinaria}) => acc + expOrdinaria + expExtraordinaria , 0)

 templateFooter.querySelector('span').textContent = nTotal
 const clone = templateFooter.cloneNode(true)
 fragment.appendChild(clone)
 footer.appendChild(fragment)

 const btnVaciar = document.getElementById('vaciar-boleto')
 btnVaciar.addEventListener('click', () => {
    boleto = {}
    pintarBoleto()
 })

 const btnGenerar = document.getElementById('generar-cupon')
 btnGenerar.addEventListener('click', () => {
    Swal.fire({
        title: 'Vas a generar el cupon de pago?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Generar',
        denyButtonText: `No generar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Generado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('No generado', '', 'info')
        }
      })
 })
}










