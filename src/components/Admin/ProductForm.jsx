import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories,selectedProduct,updateProductAsync } from '../../features/Product/ProductSlice';
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../common/Modal';



function ProductForm() {
    const brands = useSelector(selectBrands);
    const category = useSelector(selectCategories);
    const dispatch = useDispatch();
    const [thumbnail, setThumbnail] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const params=useParams();
    const selectedproduct=useSelector(selectedProduct)
    const [openModal,setOpenModal]=useState(null)
    const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm()

    useEffect(()=>{
        if(params.id){
            dispatch(fetchProductByIdAsync(params.id))
        }
        else{
            dispatch(clearSelectedProduct());
        }
    },[params.id,dispatch])

    useEffect(()=>{
        if (selectedproduct && params.id){
            setValue('title',selectedproduct.title)
            setValue('description',selectedproduct.description)
            setValue('price',selectedproduct.price)
            setValue('rating',selectedproduct.rating)
            setValue('discountPercentage',selectedproduct.discountPercentage)
            setValue('stock',selectedproduct.stock)
            setValue('brand',selectedproduct.brand)
            setValue('category',selectedproduct.category)
            setValue('thumbnail',setThumbnail(selectedproduct.thumbnail))
            setValue('images',setUploadedFiles(selectedproduct.images.map(image=>image)))

        } 
    },[selectedproduct,setValue,params.id])

    const handleDelete=()=>{
        const product={...selectedproduct};
        product.deleted=true;
        dispatch(updateProductAsync(product))
    }

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail({
                file,
                url: URL.createObjectURL(file)
            });
            setValue("thumbnail", file);

        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const newUploadedFiles = files.slice(0, 3 - uploadedFiles.length).map(file => ({
          file,
          url: URL.createObjectURL(file)
        }));
        const updatedFiles = [...uploadedFiles, ...newUploadedFiles];
        setUploadedFiles(updatedFiles);
        setValue("images",updatedFiles.map(f=>f.file))
      };

    const handleResetThumbnail = () => {
        setThumbnail(null);
        setValue("thumbnail", null);
    };

    const handleResetImage = (index) => {
        const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newUploadedFiles);
        setValue("images", newUploadedFiles.map(f => f.file));
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };


    return (
        <>
        <form onSubmit={handleSubmit(async (data) => {
            let thumbnailBase64;
            let imagesBase64;
            if(data.thumbnail){
                 thumbnailBase64 = await convertToBase64(data.thumbnail);
            }
            if (data.images) {
                imagesBase64 = await Promise.all(data.images.map(file => convertToBase64(file)));
            }
           const product={...data,
            thumbnail:thumbnailBase64,
            images:imagesBase64,
            rating:0,
            price:+data.price,
            discountPercentage:+data.discountPercentage,
            stock:+data.stock
           }

           if(params.id){
            product.id=params.id
                dispatch(updateProductAsync(product))
                product.rating=selectedProduct.rating || 0;
                reset();
                setThumbnail(null);
                setUploadedFiles([]);
           }
           else{
               dispatch(createProductAsync(product))
               reset();
               setThumbnail(null);
               setUploadedFiles([]);
           }
           navigate('/admin')
           
        })}>
            <div className="space-y-12 bg-white p-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
                    

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {selectedproduct && selectedproduct.deleted && (<h2 className='text-red-500 sm:col-span-6'>This Product is deleted</h2>)}
                        <div className="sm:col-span-6">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        {...register("title", { required: "title is Required" })}
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    {...register("description", { required: "description is Required" })}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register("brand", { required: "brand is Required" })}
                                >
                                    <option value="">--Choose brand</option>
                                    {brands.map((brand, index) => <option aria-placeholder='none' key={index} value={brand.value}>{brand.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Categories
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register("category", { required: "category is Required" })}>
                                    <option value="">--Choose category</option>
                                    {category.map((cate, index) => <option aria-placeholder='none' key={index} value={cate.value}>{cate.label}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price (In Rupees)
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="number"
                                        {...register("price", { required: "price is Required", min: 0 })}
                                        id="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                Discount Percentage
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="number"
                                        {...register("discountPercentage", { required: "discountPercentage is Required", min: 1, max: 50 })}
                                        id="discountPercentage"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="number"
                                        {...register("stock", { required: "stock is Required", min: 0 })}
                                        id="stock"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-6">
                                {!thumbnail ? (
                            <div className="text-center">
                                        <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                                        <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="thumbnail"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a thumbnail</span>
                                                <input
                                                    id="thumbnail"
                                                    {...register("thumbnail", { required: "Thumbnail is required" })}
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleThumbnailChange}
                                                    accept="image/png, image/jpeg, image/gif"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img src={thumbnail.url?thumbnail.url : thumbnail} alt="Uploaded Thumbnail" className="mx-auto h-20 w-20 object-cover rounded-md" />
                                        <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                            <p className="text-indigo-600">{thumbnail.url? "Thumbnail uploaded successfully" : null}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-2 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            onClick={handleResetThumbnail}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>

                            
                                <div className="mt-6">
                                    <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                                        Images
                                    </label>
                                    <div className="mt-2 flex flex-wrap justify-center gap-4">
                                        {uploadedFiles.length < 3 && (
                                            <div className="relative flex items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-6">
                                                <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                                                <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="images"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload images (Max {3-uploadedFiles.length} Images are allowed)</span>
                                                        <input
                                                            id="images"
                                                            type="file"
                                                            multiple
                                                            {...register("images", { required: "At least one image is required" })}
                                                            className="sr-only"
                                                            onChange={handleImagesChange}
                                                            accept="image/png, image/jpeg, image/gif"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB each</p>
                                            </div>
                                        )}
                                        {uploadedFiles.map((fileObj, index) => (
                                            <div key={index} className="relative flex flex-col items-center">
                                                <img src={fileObj.url ? fileObj.url:fileObj} alt={`Image ${index + 1}`} className="h-20 w-20 object-cover rounded-md" />
                                                <button
                                                    type="button"
                                                    className="absolute top-0 right-0 mt-2 mr-2 rounded-full bg-red-600 p-1 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                    onClick={() => handleResetImage(index)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
        
                        </div>

                        {/* <div className="sm:col-span-2">
                            <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-6">
                                {!uploadedFile ? (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                                        <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="thumbnail"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="thumbnail"
                                                    {...register("thumbnail", { required: "thumbnail is Required" })}
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img src={uploadedFile} alt="Uploaded Thumbnail" className="mx-auto h-20 w-20 object-cover rounded-md" />
                                        <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                            <p className="text-indigo-600">File uploaded successfully</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-2 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            onClick={handleReset}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 1
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-6">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                                    <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="image1"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="image1" {...register("image1", { required: "image1 is Required" })} type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 2
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-6">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                                    <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="image2"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="image2" {...register("image2", { required: "image2 is Required" })} type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 3
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-6">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                                    <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="image3"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="image3" {...register("image3", { required: "image3 is Required" })} type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div> */}



                    </div>
                </div>



                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                            Comments
                                        </label>
                                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                            Candidates
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-gray-900">
                                            Offers
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                        Everything
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Same as email
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                {
                    selectedproduct && !selectedproduct.deleted && ( 
                <button
                onClick={(e)=>{
                    e.preventDefault();
                    setOpenModal(true);
                }} 
                type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                    Delete
                </button>
                    )
}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
        {selectedproduct && (
        <Modal
          title={`Delete ${selectedproduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
        </>
    );
}

export default ProductForm;