
function Orderedproduct({cart} : any) {
  return (
    <>
    <div className='bg-transparent flex flex-col justify-center items-center p-2'>
      <div className='bg-slate-700 p-1'>
      <h1 className='text-3xl font-bold underline text-center text-slate-50 '>Ordered Products</h1>
        <p className='text-xl font-bold underline text-center text-slate-50'>{cart?.product?.name}</p>
        <div className='w-[300px] h-[300px] flex justify-center items-center'>
        <img 
        className="w-full h-full object-cover rounded-xl dark:bg-gray-500 dark:highlight-white/20"   
        src={cart?.product?.image} loading="lazy" alt="" />
        </div>
        <p className="text-xl font-bold underline text-center text-slate-50">Quantity : {cart?.quantity}</p>
        <p className="text-xl font-bold underline text-center text-slate-50">Price : Npr{cart?.product?.price - cart?.product?.discount}</p>
      </div>
    </div>
    </>
  )
}

export default Orderedproduct