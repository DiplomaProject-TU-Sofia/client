import React from 'react'
import Image from 'next/image'
export default function DisplayCard() {
  return (
      <div className='w-[15vw] h-[30vh] flex justify-between items-center bg-white p-5 shadow-lg'>
          <div className='flex flex-col gap-5 items-center justify-center'>
              <Image src={'/assets/testImage.webp'} width={100} height={100} alt='neshtosi'/>
              <h1>Test</h1>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illo distinctio adipisci velit fuga sunt in nihil provident nisi. Officia quaerat, minima tempore tenetur eius libero perferendis neque temporibus laudantium?</span>
          </div>
     </div>
  )
}
