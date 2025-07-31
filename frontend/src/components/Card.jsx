

const Card=({className,children})=>{
  return(
   <div className={`bg-white shadow-lg rounded-md ${className}`}>
  {children}
   </div> 
  )
}

export default Card;