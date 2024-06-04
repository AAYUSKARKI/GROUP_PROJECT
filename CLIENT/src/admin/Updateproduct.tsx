import {useState} from 'react'
import Dashboard from './Dashboard'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IoCloudUploadOutline } from 'react-icons/io5'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom'

function Updateproduct() {
    
    const {id} = useParams()
    
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        discount: 0,
        quantity: 0,
        color: '',
        size:[] as string[],
    })
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('')

    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleSizeChange = (selectedSizes: string[]) => {
      setProduct({ ...product, size: selectedSizes });
    };

    const handleUploadImage = async (e : any) => {
        const file = e.target.files[0]
        setImage(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImagePreview(reader.result as string)
        }
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('category', product.category)
        formData.append('price', String(product.price))
        formData.append('discount', String(product.discount))
        formData.append('quantity', String(product.quantity))
        formData.append('color', product.color)
        formData.append('size', String(product.size))
        formData.append('image', image)

        try {
            setLoading(true)
            const response = await axios.post('http://localhost:7000/api/v1/products/updateproduct', formData)
            console.log(response.data)
            setLoading(false)
            toast.success('Product added successfully')
            setProduct({
                name: '',
                description: '',
                category: '',
                price: 0,
                discount: 0,
                quantity: 0,
                color: '',
                size: [],
            })
            setImage('')
            setImagePreview('')
        } 
        catch (error : any) {
            setLoading(false)
            toast.error(error.message)
        }
    }

  
  return (
    <>
    <div className=' w-full bg-slate-800'>
    <Dashboard/>
    <h1 className='text-white text-3xl text-center'>LUCIDMERCH-DASHBOARD!</h1>

    <div className='flex justify-center items-center'>
        <form 
        onSubmit={handleSubmit}
        className='w-1/2  bg-slate-50 p-10 rounded-xl shadow-xl shadow-slate-400/20'
        >
            
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Product Name
                </label>
                <input
                type='text'
                name='name'
                value={product.name}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='flex flex-col-reverse justify-center items-center'>
                <label
                className=' flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white'
                >
                    <IoCloudUploadOutline className='text-black'/>
                    <input
                    type='file'
                    name='image'
                    className='hidden'
                    onChange={handleUploadImage}
                    />
                </label>
                <div className=''>
                    <img
                    src={imagePreview}
                    alt='preview'
                    className='w-full h-full object-cover'
                    />
                </div>
            </div>
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Description
                </label>
                <ReactQuill 
                className='shadow appearance-none overflow-hidden border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                theme="snow"
                style={{ height: '400px' }}
                value={product.description} 
                onChange={(e) => setProduct({ ...product, description: e })} 
                />
            </div>
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Category
                </label>
                <input
                type='text'
                name='category'
                value={product.category}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Price
                </label>
                <input
                type='number'
                name='price'
                value={product.price}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Discount
                </label>
                <input
                type='number'
                name='discount'
                value={product.discount}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Quantity
                </label>
                <input
                type='number'
                name='quantity'
                value={product.quantity}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Color
                </label>
                <input
                type='text'
                name='color'
                value={product.color}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='mt-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                >
                    Size
                </label>
                <select
                multiple
                name='size'
                value={product.size}
                onChange={(e) => handleSizeChange(Array.from(e.target.selectedOptions, (option) => option.value))}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                >
                {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                      </option>
                ))}
                </select>
            </div>
            <div className='mt-4'>
                {
                  loading?
                  <div
                   className='loading flex justify-center items-center'></div>:
                  <button
                   type='submit'
                   className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                    Update Product
                </button>
                }
            </div>
        </form>
    </div>
    </div>
    </>
  )
}

export default Updateproduct