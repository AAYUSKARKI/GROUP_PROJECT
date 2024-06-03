import React from 'react'
import photo1 from '../../../../assests/rose1.jpg'

function HomeCard() {
  return (
    <div  className='w-full min-w-[290px] md:min-w-[320px] max-w-[290px] md:max-w-[320px] h-56 bg-white rounded-md shadow flex  m-7'>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] mx-1 '>
                            <img src={photo1} className='object-scale-down w-full h-full hover:scale-110 transition-all mix-blend-multiply  '/>
                        </div>
                        <div className='p-4 grid  gap-2'>
                            <h2 className='text-b font-bold md:text-lg text-ellipsis line-clamp-2 text-black'>Primium cotton high qulaity random designed Tshirt</h2>
                            <p className='capitalize text-slate-500'>T-shirt</p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>NRS . 5000</p>
                                <p className='text-slate-500 line-through'>NRS. 4000</p>
                            </div>
                            <div className='flex gap-5'>
                                <button className='bg-black text-white w-8 rounded-md   '>X</button>
                                <button className='bg-black text-white w-8 rounded-md   '>XL</button>
                                <button className='bg-black text-white w-8 rounded-md   '>XXL</button>
                            </div>
                            <button className='text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
                        </div>
                    </div>
  )
}

export default HomeCard