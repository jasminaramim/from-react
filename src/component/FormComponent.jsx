import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

// Validation schema
const schema = yup.object().shape({
  country: yup.string().required('Country is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  company: yup.string(),
  address: yup.string().required('Address is required'),
  apartment: yup.string(),
  postalCode: yup.string().required('Postal code is required'),
  city: yup.string().required('City is required'),
  phone: yup.string().required('Phone is required'),
  state: yup.string().when('country', ([country], schema) =>
    country === 'Australia'
      ? schema.required('State/territory is required')
      : schema.notRequired()
  ),
});

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { country: 'Netherlands' },
  });

  const country = watch('country');

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <Toaster />
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg border border-purple-100">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-800">
          Shipping Information - {country}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Country */}
          <div>
            <label className="block mb-1 font-medium text-purple-700">Country/Region</label>
            <select
              {...register('country')}
              className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
            >
              <option value="Netherlands">Netherlands</option>
              <option value="Australia">Australia</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
            )}
          </div>

          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                {...register('firstName')}
                placeholder="First name"
                className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                {...register('lastName')}
                placeholder="Last name"
                className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <input
              {...register('company')}
              placeholder="Company (optional)"
              className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
            />
          </div>

          {/* Address */}
          <div>
            <input
              {...register('address')}
              placeholder="Address"
              className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Apartment */}
          <div>
            <input
              {...register('apartment')}
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
            />
          </div>

          {/* Postal Code & City */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                {...register('postalCode')}
                placeholder="Postal code"
                className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                {...register('city')}
                placeholder="City"
                className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <input
              {...register('phone')}
              placeholder="Phone"
              className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* State (conditional) */}
          {country === 'Australia' && (
            <div>
              <input
                {...register('state')}
                placeholder="State/Territory"
                className="w-full border border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 text-purple-800"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-transparent text-purple-700 py-2 rounded-lg border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition duration-300 font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;