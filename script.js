let ImageIDs=[]
const url='http://localhost:3000/images'


const submit=document.querySelector('#submit')
submit.addEventListener('click',async ()=>{
  document.querySelector('#loading').classList.remove('hidden')
  let formData=new FormData()
  let fileField=document.querySelector("input[type='file']")
  formData.append('photo',fileField.files[0])

  await fetch(url,{
    method:'POST',
    body:formData
  })
  document.querySelector('#loading').classList.add('hidden')
  location.reload()
})



fetch(url).then((res)=>{
  return res.json()
}).then(data=>{
  console.log(data);
  const imageContainer=document.querySelector('.gallery')
  let finalData=""
  let cnt=0;
  data.forEach(ele => {
    // <div class="image">
    //     <img src="img/pic-1.jpg" alt="pic-1" >
    //     <button class="delete" id="del-${cnt}">Delete</button>
    //   </div>
    const imageUrl="http://localhost:3000/images/"+ele._id;
    ImageIDs.push(ele._id);
    console.log(imageUrl);
    finalData=finalData + `<div class="image"><img src=${imageUrl} id="pic-${cnt}">
    <button class="delete" id="del-${cnt}">Delete</button>
    </div>
    `
    cnt++
  });
  
  imageContainer.innerHTML=finalData
  document.querySelector('#loading').classList.add('hidden')
  for(let i=0;i<cnt;i++){
    document.querySelector('#del-'+i).addEventListener('click',async ()=>{
      const fullUrl="http://localhost:3000/images/"+ImageIDs[i];
      console.log(fullUrl,i);
      await fetch(fullUrl,{
        method:'DELETE'
      })
      location.reload()
    })
  }
})




