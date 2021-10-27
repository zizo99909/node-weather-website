

const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo =  document.querySelector('#message-2')
const $location =document.querySelector('#location-button')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
   fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{    
       if(data.error){
       messageOne.textContent=data.error
        } else{   

            messageOne.textContent=data.location 
            messageTwo.textContent=data.forecast
         }
   })
})
})

$location.addEventListener('click',()=>{
   
   if(! navigator.geolocation) {
      return mesaageOne.textContent= alert('Geolocation is not supported by your browser!')
  }
  messageOne.textContent='Loading...'
  messageTwo.textContent=''
  $location.setAttribute('disabled','disabled')
  
  navigator.geolocation.getCurrentPosition((position)=>{
     const latitude=position.coords.latitude
     const longitude=position.coords.longitude
      fetch('/weather?latitude='+latitude+'&longitude='+longitude).then((response)=>{
         response.json().then((data)=>{
            if(data.error){
               messageOne.textContent=data.error
            }else{
               messageOne.textContent=data.forecast
            }
         })
      })
  })



   

})

