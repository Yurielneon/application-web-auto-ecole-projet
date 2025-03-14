import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form' // Import manquant ajouté


export default function CustomDatePicker({ control, name, placeholder }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          selected={field.value}
          onChange={field.onChange}
          placeholderText={placeholder}
          className="w-full px-4 py-2 rounded-xl  dark:border-gray-600 
                   bg-background-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          dropdownMode="select"
        />
      )}
    />
  )
}