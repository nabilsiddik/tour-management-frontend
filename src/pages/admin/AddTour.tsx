import AddTourForm from '@/components/forms/AddTourForm'

const AddTour = () => {

  return (
    <div >
      {/* overlay  */}
      {/* className='w-full h-full relative' style={{
      backgroundImage: `url(${addTourBg})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }} */}
      {/* <div className='absolute w-full h-full inset-0 bg-black/85 z-0'></div> */}

      <div className='relative z-10 flex items-center min-h-[80vh]'>
        <AddTourForm/>
      </div>
    </div>
  )
}

export default AddTour
