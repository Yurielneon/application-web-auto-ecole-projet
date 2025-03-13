const Alert = ({ children, type = 'info', className }) => {
    const typeStyles = {
      warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
    };
  
    return (
      <div className={`p-4 rounded-lg ${typeStyles[type]} ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Alert;