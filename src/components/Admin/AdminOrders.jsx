import React from 'react';
import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../app/constants'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, order, selectOrders, selectTotalOrders, updateOrdersAsync, selectStatusOrder } from '../../features/Orders/orderSlice'
import { XMarkIcon, EyeIcon, PencilIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import { discountedPrice } from '../../app/constants';
import Pagination from '../../common/Pagination';
import { Oval } from 'react-loader-spinner';




function AdminOrders() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders)
    const totalorders = useSelector(selectTotalOrders)
    const [editableOrderId, setedittableOrderId] = useState(-1)
    const [sort, setSort] = useState({ _sort: 'id', _order: 'asc' });
    const status = useSelector(selectStatusOrder)


    const handlePage = (page) => {
        setPage(page);
    }

    const handleSort = (sortOptions) => {
        const newsort = { _sort: sortOptions.sort, _order: sortOptions.order }
        setSort(newsort)
    }


    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchAllOrdersAsync({ sort, pagination }))
    }, [dispatch, page, sort])

    const handleShow = (item) => {
        console.log("handleShow")
    }
    const handleEdit = (order) => {
        setedittableOrderId(order.id)
    }
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value }
        dispatch(updateOrdersAsync(updatedOrder))
        setedittableOrderId(-1)
    }

    return (
        <div className="p-5">
            <div className="overflow-x-auto rounded-lg">
                {status === 'loading' && !orders ? (
                    <div className="flex justify-center items-center h-screen">
                        <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#1f2937"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>

                ) : null}
                <table className="table-fixed min-w-full bg-white border-collapse rounded-lg shadow-md">
                    <thead className="bg-white">
                        <tr>
                            <th className="w-1/6 border-b-2 border-gray-200 py-2 px-3 uppercase text-s font-semibold text-gray-400 text-left cursor-pointer" onClick={(e) => handleSort({ sort: 'id', order: sort?._order === 'asc' ? 'desc' : 'asc', })}>ID {sort._sort === 'id' && (sort._order === 'asc' ? (<ArrowUpIcon className='w-4 h-4 inline-block'></ArrowUpIcon>) :
                                (<ArrowDownIcon className='w-4 h-4 inline-block'></ArrowDownIcon>))}</th>
                            <th className="w-1/10 border-b-2 border-gray-200 py-2 px-3 uppercase text-s font-semibold text-gray-400 text-left">Status</th>
                            <th className="w-1/6 border-b-2 border-gray-200 py-2 px-3 uppercase text-s font-semibold text-gray-400 text-left">Customer</th>
                            <th className="w-1/2 border-b-2 border-gray-200 py-2 px-3 uppercase text-s font-semibold text-gray-400 text-left">Product Details
                                <span className="ml-9">Quantity</span><span className='ml-8'>Price</span></th>
                            <th className="border-b-2 border-gray-200 py-2 px-3 uppercase text-s font-semibold text-gray-400 text-left">Shipping Address</th>
                            <th className="w-1/2 border-b-2 border-gray-200 py-2 px-3 uppercase text-s font-semibold text-gray-400 text-left cursor-pointer" onClick={(e) => handleSort({ sort: 'totalAmount', order: sort?._order === 'asc' ? 'desc' : 'asc', })}>Revenue {sort._sort === 'totalAmount' && (sort._order === 'asc' ? (<ArrowUpIcon className='w-4 h-4 inline-block'></ArrowUpIcon>) : (<ArrowDownIcon className='w-4 h-4 inline-block'></ArrowDownIcon>))}</th>
                            <th className="w-10/12 border-b-2 border-gray-200 py-2 px-3 uppercase text-s font-semibold text-gray-400 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500">#{order.id}</td>
                                <td className="border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500">
                                    {order.id === editableOrderId ? (
                                        <select className='border border-gray-300 rounded-lg' defaultValue="none" onChange={e => handleUpdate(e, order)}>
                                            <option value="">None</option>
                                            <option value="pending">Pending</option>
                                            <option value="dispatched">Dispatched</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="Refunded">Refunded</option>
                                        </select>
                                    ) : (
                                        <>
                                            {order.status === 'delivered' && (
                                                <div className="flex items-center gap-2">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                                            <circle cx="24" cy="24" r="20" fill="#6be3a2"></circle>
                                                            <path fill="#324561" d="M22.5,33c-0.226,0-0.446-0.076-0.625-0.219l-7.5-6c-0.431-0.345-0.501-0.974-0.156-1.405 c0.347-0.431,0.975-0.501,1.406-0.156l6.667,5.334l9.889-14.126c0.316-0.454,0.94-0.562,1.393-0.246 c0.453,0.317,0.562,0.94,0.246,1.393l-10.5,15c-0.158,0.227-0.403,0.377-0.677,0.417C22.595,32.997,22.547,33,22.5,33z"></path>
                                                        </svg>
                                                    </span>
                                                    <span>Delivered</span>
                                                </div>
                                            )}
                                            {order.status === 'Refunded' && (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-purple-950">
                                                        <span>
                                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="19" height="19">
                                                                <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.5854 3 5.61494 4.90157 4.08982 7.7035M3.61447 4.16797V7.7035H4.08982M4.08982 7.7035H7.15" stroke="#292556" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <span>Refunded</span>
                                                </div>
                                            )}
                                            {order.status === 'dispatched' && (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-purple-950">
                                                        <span>
                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 2V12C15 13.1 14.1 14 13 14H2V7.62C2.73 8.49 3.85003 9.03 5.09003 9C6.10003 8.98 7.01 8.59 7.69 7.94C8 7.68 8.26002 7.34999 8.46002 6.98999C8.82002 6.37999 9.02 5.65997 9 4.90997C8.97 3.73997 8.45001 2.71 7.64001 2H15Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 14V17C22 18.66 20.66 20 19 20H18C18 18.9 17.1 18 16 18C14.9 18 14 18.9 14 20H10C10 18.9 9.1 18 8 18C6.9 18 6 18.9 6 20H5C3.34 20 2 18.66 2 17V14H13C14.1 14 15 13.1 15 12V5H16.84C17.56 5 18.22 5.39001 18.58 6.01001L20.29 9H19C18.45 9 18 9.45 18 10V13C18 13.55 18.45 14 19 14H22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 6.2 8.47001 7.27 7.64001 8C6.93001 8.62 6.01 9 5 9C2.79 9 1 7.21 1 5C1 3.74 1.58 2.61 2.5 1.88C3.19 1.33 4.06 1 5 1C7.21 1 9 2.79 9 5Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.25 3.75V5.25L4 6" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                        </span>
                                                    </div>
                                                    <span>Dispatched</span>
                                                </div>
                                            )}
                                            {order.status === 'cancelled' && (
                                                <div className="flex items-center gap-2 -ml-2">
                                                    <span>
                                                        <svg width="40" height="40" viewBox="-2.64 -2.64 29.28 29.28" xmlns="http://www.w3.org/2000/svg" fill="#ff0000" stroke="#ff0000">
                                                            <g id="Complete">
                                                                <g id="x-circle">
                                                                    <g>
                                                                        <circle cx="12" cy="12" r="10" stroke="#e60000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.36" fill="none"></circle>
                                                                        <line x1="15" y1="9" x2="9" y2="15" stroke="#e60000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.36" fill="none"></line>
                                                                        <line x1="15" y1="15" x2="9" y2="9" stroke="#e60000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.36" fill="none"></line>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    <span className='-ml-0.5'>
                                                        Cancelled
                                                    </span>
                                                </div>
                                            )}
                                            {order.status === 'pending' && (
                                                <div className="flex items-center gap-2 -ml-2">
                                                    <span>
                                                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.06083 10.8901C2.61366 5.88912 6.85189 2 11.9998 2C14.2363 2 16.0401 2.88495 17.5809 4.0323C18.4274 4.66267 19.235 5.40719 19.9999 6.14376V3C19.9999 2.44771 20.4476 2 20.9999 2C21.5522 2 21.9999 2.44771 21.9999 3V8.5C21.9999 8.6503 21.9667 8.79285 21.9073 8.92074C21.8785 8.98289 21.8429 9.04275 21.8005 9.09924C21.7677 9.14307 21.7313 9.18412 21.6918 9.22197C21.607 9.30337 21.5111 9.36702 21.409 9.41276C21.2841 9.46882 21.1456 9.5 20.9999 9.5H15.4999C14.9476 9.5 14.4999 9.05228 14.4999 8.5C14.4999 7.94772 14.9476 7.5 15.4999 7.5H18.5242C17.8279 6.82979 17.137 6.19538 16.3863 5.6364C15.0539 4.64418 13.6619 4 11.9998 4C7.88269 4 4.49078 7.11098 4.04872 11.1099C3.98804 11.6588 3.49384 12.0546 2.9449 11.9939C2.39596 11.9333 2.00015 11.4391 2.06083 10.8901Z" fill="#000000"></path> <path d="M21.9937 13.1099C21.4409 18.1109 17.2027 22 12.0547 22C9.81822 22 8.01448 21.115 6.47371 19.9677C5.62719 19.3373 4.81957 18.5928 4.05469 17.8562V21C4.05469 21.5523 3.60697 22 3.05469 22C2.5024 22 2.05469 21.5523 2.05469 21V15.5C2.05469 15.3497 2.08785 15.2071 2.14724 15.0793C2.17607 15.0171 2.21166 14.9572 2.25404 14.9008C2.2869 14.8569 2.32328 14.8159 2.36276 14.778C2.44755 14.6966 2.54344 14.633 2.64559 14.5872C2.77047 14.5312 2.90894 14.5 3.05469 14.5H8.55469C9.10697 14.5 9.55469 14.9477 9.55469 15.5C9.55469 16.0523 9.10697 16.5 8.55469 16.5H5.53039C6.22662 17.1702 6.91757 17.8046 7.66822 18.3636C9.00068 19.3558 10.3927 20 12.0547 20C16.1719 20 19.5638 16.889 20.0058 12.8901C20.0665 12.3412 20.5607 11.9454 21.1097 12.0061C21.6586 12.0667 22.0544 12.5609 21.9937 13.1099Z" fill="#000000"></path> </g></svg>

                                                    </span>
                                                    <span className='-ml-0.5'>
                                                        Pending
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    )}

                                </td>
                                <td className="border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500">
                                    <div className="flex items-center">
                                        <span className="ml-2">{order.selectedAddress.name}</span>
                                    </div>
                                </td>
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="w-1/4 border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500">
                                            <div className="flex">
                                                <img src={item.thumbnail} alt={item.title} className="w-8 h-8 rounded-full" />
                                                <span className="ml-2">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="w-1/6 border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500 text-right">
                                            <span>#{item.quantity}</span>
                                        </td>
                                        <td className="w-1/6 border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500 text-right">
                                            <span>${discountedPrice(item)}</span>
                                        </td>
                                    </tr>

                                ))}
                                <td className="border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500">
                                    <div className='items-center'>{order.selectedAddress.name},</div>
                                    <div className='items-center'>{order.selectedAddress.email},</div>
                                    <div className='items-center'>{order.selectedAddress.phone},</div>
                                    <div className='items-center'>{order.selectedAddress.street},</div>
                                    <div className='items-center'>{order.selectedAddress.city},</div>
                                    <div className='items-center'>{order.selectedAddress.state},</div>
                                    <div className='items-center'>{order.selectedAddress.pinCode},</div>

                                </td>

                                <td className="border-b border-gray-200 py-2 px-3 text-s font-semibold text-gray-500">
                                    $ {order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}
                                </td>
                                <td className="border-b border-gray-200 py-2 px-3 text-s font-semibold text-center">
                                    <div className='flex items-center justify-center'>
                                        <div className='w-6 mr-4 '>
                                            <EyeIcon className='w-8 h-8 transform hover:text-purple-500 hover:scale-120' onClick={e => handleShow(order)}></EyeIcon>
                                        </div>
                                        <div className='w-6 mr-2'>
                                            <PencilIcon className='w-8 h-8  hover:text-purple-500 hover:scale-120' onClick={e => handleEdit(order)}></PencilIcon>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} setPage={page} handlePage={handlePage} totalItems={totalorders}></Pagination>
        </div>

    );
}

export default AdminOrders;
