import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectedInfo } from '../../features/User/userSlice'
import { updateUserAsync } from '../../features/Auth/authSlice'
import { useForm } from "react-hook-form"

export default function UserProfile() {
  const user = useSelector(selectedInfo)
  const dispatch = useDispatch()
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [addNewAddress, setaddNewAddress] = useState(false);

  
  const handleEdit = (updatedAddress, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser))
  }
  
  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address=user.addresses[index]
    if (addNewAddress===true) {
      setaddNewAddress(false)
    }
    setValue('name',address.name)
    setValue('email',address.email)
    setValue('phone',address.phone)
    setValue('street',address.street)
    setValue('city',address.city)
    setValue('state',address.state)
    setValue('pinCode',address.pinCode)
  }

  const handleAdd=(address)=>{
    const newUser = { ...user, addresses: [...user.addresses,address] }
    dispatch(updateUserAsync(newUser))
    reset();
    setaddNewAddress(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-2xl sm:text-4xl my-5 font-bold tracking-tight text-gray-900">Name: {user.name ? user.name : 'New User'}</h1>
          <h3 className="text-lg sm:text-xl my-5 font-bold tracking-tight text-red-900">Email: {user.email}</h3>
          { user.role==='admin' && (<h3 className="text-lg sm:text-xl my-5 font-bold tracking-tight text-red-900">Role : {user.role}</h3>)}
        </div>


        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <button
                        type="button"
                        onClick={e=>{
                          setaddNewAddress(true);
                          setSelectedEditIndex(-1);
                          reset();
                        }}

                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add New Address
                        </button>
                        { addNewAddress ?
                <form className='bg-white px-3 mt-12 py-12'
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    handleAdd(data)
                    reset();
                  })
                  }>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", { required: "name is Required" })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>


                        <div className="sm:col-span-4">
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", { required: "email is Required" })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone No
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", { required: "phone is Required" })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", { required: "street is Required" })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", { required: "city is Required" })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", { required: "state is Required" })}
                              id="state"
                              autoComplete="address-level1"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", { required: "pinCode is Required" })}
                              id="pinCode"
                              autoComplete="pincCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={e=>setaddNewAddress(false)}>
                        Close
                      </button>
                      <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={e=>reset()}>
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>


                </form> : null}
          <p className="mt-0.5 text-sm text-gray-500">Your Addresses : </p>
          {user.addresses.map((address, index) =>
            <div key={index}>
              { selectedEditIndex===index ?
                <form className='bg-white px-3 mt-12 py-12'
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    handleEdit(data, index)
                    reset();
                  })
                  }>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", { required: "name is Required" })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>


                        <div className="sm:col-span-4">
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", { required: "email is Required" })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone No
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", { required: "phone is Required" })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", { required: "street is Required" })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", { required: "city is Required" })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", { required: "state is Required" })}
                              id="state"
                              autoComplete="address-level1"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", { required: "pinCode is Required" })}
                              id="pinCode"
                              autoComplete="pincCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={e=>setSelectedEditIndex(-1)}>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>


                </form> : null}
              <div key={index} className="flex flex-col sm:flex-row justify-between gap-x-6 gap-y-4 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                  </div>
                </div>
                <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                  <p className="text-sm leading-6 text-gray-500">{address.city}</p>
                </div>
                <div className="shrink-0 flex flex-row sm:flex-col sm:items-end space-x-2 sm:space-x-0 sm:space-y-2">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

