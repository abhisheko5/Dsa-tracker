

const Card=({className,children})=>{
  return(
   <div className={` shadow-lg rounded-md ${className}`}>
  {children}
   </div> 
  )
}

export default Card;