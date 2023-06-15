import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setFlag, setDisableOptions } from '../globalRedux/slice/slice'
import { postTask } from '../globalRedux/slice/slice'

const Form = () => {

  const dispatch = useDispatch()

  const { register, formState: { errors }, handleSubmit, watch } = useForm()
  const password = watch('password')

  const submitHandler = async (data) => {
    dispatch(setDisableOptions(false))
    dispatch(postTask(data))
    dispatch(setFlag(false))
  }

  const handleCancel = () => {
    dispatch(setDisableOptions(false))
    dispatch(setFlag(false))
  }

  return (
    <div className='absolute top-1/2 left-1/2 w-96  transform -translate-x-1/2 -translate-y-1/2'>
      <form action="POST" className='' onSubmit={handleSubmit(submitHandler)}>
        <div className='flex flex-col m-auto justify-center items-center text-center bg-slate-100'>
          <p className='text-center text-4xl font-semibold font-sans underline'>Add Task</p>
          <input
            type="text" placeholder='Title'
            className='border border-black rounded w-72 h-8 mt-5 p-1' {...register('title', { required: true })} autoComplete='off' />
          {errors.title && <span className='text-red-600'>**Title is required</span>}
          <input
            type="text" placeholder='Description'
            className='border border-black rounded w-72 h-8 mt-3 p-1' {...register('description', { required: true })} autoComplete='off' />
          {errors.description && <span className='text-red-600'>**Description is required</span>}
          <select
            name="status"
            className="border border-black rounded w-72 h-8 mt-3 p-1"
            {...register('status', { required: true })}
          >
            <option value="">Select Status</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <span className='text-red-600'>**Status is required</span>}
          <div className=''>
            <input type="submit" value="Add" className='border border-black bg-slate-200 rounded-md w-16 h-7 mt-4 hover:cursor-pointer hover:bg-slate-300 mr-1' />
            <input type="cancel" value="Cancel" className='border border-black bg-slate-200 rounded-md w-16 h-7 mt-4 hover:cursor-pointer hover:bg-slate-300 ml-1 text-center' onClick={handleCancel} />
          </div>
        </div>

      </form>
    </div>
  )
}

export default Form