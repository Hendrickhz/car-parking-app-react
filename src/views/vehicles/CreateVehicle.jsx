import ValidationError from '../../components/ValidationError'
import IconSpinner from '../../components/IconSpinner'
import { useVehicle } from '../../hooks/useVehicle'
import { route } from '../../routes';
import { Navigate } from 'react-router-dom';

const CreateVehicle = () => {
    const {vehicle,createVehicle}= useVehicle();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        createVehicle(vehicle.data)
    }
  return (
    <form onSubmit={ handleSubmit } noValidate>
    <div className="flex flex-col mx-auto md:w-96 w-full">

      <h1 className="heading">Add Vehicle</h1>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="plate_number" className="required">License Plate</label>
        <input
          id="plate_number"
          name="plate_number"
          type="text"
          value={ vehicle.data.plate_number ?? '' }
          onChange={ event => vehicle.setData({
            ...vehicle.data,
            plate_number: event.target.value,
          }) }
          className="form-input plate"
          disabled={ vehicle.loading }
        />
        <ValidationError errors={ vehicle.errors } field="plate_number" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={ vehicle.data.description ?? '' }
          onChange={ event => vehicle.setData({
            ...vehicle.data,
            description: event.target.value,
          }) }
          className="form-input"
          disabled={ vehicle.loading }
        />
        <ValidationError errors={ vehicle.errors } field="email" />
      </div>

      <div className="border-t h-[1px] my-6"></div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={ vehicle.loading }
        >
          { vehicle.loading && <IconSpinner /> }
          Save Vehicle
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          disabled={ vehicle.loading }
          onClick={ () => Navigate(route('vehicles.index')) }
        >
          <span>Cancel</span>
        </button>
      </div>
    </div>
  </form>
  )
}

export default CreateVehicle