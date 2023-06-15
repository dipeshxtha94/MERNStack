import React, { useEffect, useState } from 'react'
import { fetchTask, setFlag, setEditFlag } from '../globalRedux/slice/slice';
import { useDispatch, useSelector } from "react-redux";
import EditForm from './EditForm';
import Loading from './Loading';
import DeleteAlert from './DeleteAlert';
import { setDeleteFlag, setDisableOptions } from '../globalRedux/slice/slice';

const Task = () => {

    const deleteFlag = useSelector(state => state.counter.deleteFlag)
    const disableOptions = useSelector(state => state.counter.disableOptions)
    console.log(deleteFlag)

    const [id, setId] = useState('')
    const [ID, setID] = useState('')

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.counter);
    const loading = useSelector(state => state.counter.loading)
    const editFlag = useSelector(state => state.counter.editFlag)

    useEffect(() => {
        dispatch(fetchTask());
    }, [dispatch]);


    const handleAddTask = () => {
        dispatch(setDisableOptions(true))
        dispatch(setFlag(true))

    }

    const handleDelete = async (e) => {
        dispatch(setDisableOptions(true))
        dispatch(setDeleteFlag(true))
        setID(e)
    }

    const handleEdit = (id, title, description, status) => {
        dispatch(setDisableOptions(true))
        dispatch(setEditFlag(true))
        setId({ id: id, title: title, description: description, status: status })
    }

    return (
        <>
            {loading && <Loading />}
            <main className='mt-5'>
                <div className='flex justify-end items-end mr-8 mb-4'>
                    <button className='border-2 rounded-md pt-1 pb-1 pr-2 pl-2 hover:bg-green-600'
                        onClick={handleAddTask} disabled={disableOptions}>Add New Task</button>
                </div>
                <div className='w-3/4 border-2 flex flex-col justify-center items-center m-auto mb-10'>
                    <p className='text-3xl mb-6 font-semibold underline mt-2'>All Tasks</p>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {data && data.map((val, idx) => {
                            return (
                                <div key={idx}
                                    className='w-11/12 flex flex-col justify-center text-base border p-2 pl-4 m-2'>
                                    <p>Title: {val.title}</p>
                                    <p>Description: {val.description}</p>
                                    <p>Status: {val.status}</p>
                                    <div className='mt-2'>
                                        <button
                                            className='border bg-slate-100 pt-1 pb-1 pr-2 pl-2 mr-1 rounded-md hover:cursor-pointer hover:bg-blue-500'
                                            onClick={() => handleEdit(val._id, val.title, val.description, val.status)} disabled={disableOptions}>
                                            Edit
                                        </button>
                                        <button
                                            className='border bg-slate-100 pt-1 pb-1 pr-2 pl-2 ml-1 rounded-md hover:cursor-pointer hover:bg-red-600'
                                            onClick={() => handleDelete(val._id)} disabled={disableOptions}>
                                            Delete
                                        </button>
                                    </div>
                                </div>)

                        })}
                    </div>

                </div>
                <div>
                    {editFlag && <EditForm value={id} />}
                    {deleteFlag && <DeleteAlert ID={ID} />}
                </div>
            </main>
        </>
    )
}


export default Task