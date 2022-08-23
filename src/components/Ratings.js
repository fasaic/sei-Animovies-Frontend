import { useEffect, useState } from "react"

const StarRating = ({ addRating, hover, setHover, setAddRating, formData, setFormData }) => {
  // let index=0
  const handleClick = (event) => {
    console.log("clicked")
    console.log(event.target.type)
    // setAddRating(index)
    // console.log(event.target.value)
  }

  useEffect(() => {
    console.log('addRating-->', addRating)
    setFormData({...formData, 'rating': addRating})
  }, [])

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || addRating) ? "on" : "off"}
            onClick={handleClick}
            // onMouseEnter={() => setHover(index)}
            // onMouseLeave={() => {setHover(addRating)
            //   }}
          >
            <span className="star">&#9787;</span>
            {/* <span className="star">&#10084;</span> */}
          </button>
        );
      })}
    </div>
  )
}

export default StarRating