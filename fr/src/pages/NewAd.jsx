import React from 'react'
import NewAdForm from '../components/forms/NewAdForm'
import Banner from '../components/Banner';


const NewAd = () => {
  const title = `Neue Anzeige aufgeben`;
  const desc = ``;
  return (
    <div>
     <div>
      <Banner title={title} desc={desc} target={"/allad"}/>
    </div>
   <NewAdForm/>
    </div>
  )
}

export default NewAd