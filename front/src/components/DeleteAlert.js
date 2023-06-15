import React from 'react'
import axios from 'axios'
import { setDeleteFlag, setDisableOptions } from '../globalRedux/slice/slice'
import { useDispatch } from 'react-redux'

const DeleteAlert = ({ ID }) => {

    const dispatch = useDispatch()

    const handleYes = async () => {
        dispatch(setDisableOptions(false))
        try {
            await axios.delete(`http://localhost:4000/api/hello/${ID}`)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleNo = () => {
        dispatch(setDisableOptions(false))
        dispatch(setDeleteFlag(false))
    }

    return (
        <div
            className='absolute top-0 mt-12 bg-slate-50 rounded-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-3 pb-3 pr-3 pl-3 text-center items-center border-2'>
            <p>Are you want delete this task?</p>
            <button
                className='border-2 bg-red-500 hover:bg-red-600 text-center pl-2 pr-2 rounded-md mr-2 mt-2'
                onClick={handleYes} >
                Yes
            </button>
            <button
                className='border-2 bg-blue-500 hover:bg-blue-600 text-center pl-2 pr-2 rounded-md ml-2 mt-2'
                onClick={handleNo}>
                No
            </button>
        </div>
    )
}

export default DeleteAlert