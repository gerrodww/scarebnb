import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createSpot } from "../../store/spots";
import { moreImageThunk, spotImageThunk } from "../../store/images";
import { useNavigate } from "react-router-dom";

function NewSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('')
  const [url, setUrl] = useState('')
  const [url2, setUrl2] = useState('')
  const [url3, setUrl3] = useState('')
  const [url4, setUrl4] = useState('')
  const [url5, setUrl5] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const spotData = {
      address,
      city,
      state,
      country,
      name,
      description,
      price
    };

    const createdSpot = await dispatch(createSpot(spotData));
    const spotId = createdSpot.id
    await dispatch(spotImageThunk({url, spotId}));

    const additionalUrls = [url2, url3, url4, url5];
    for (let i = 0; i < additionalUrls.length; i++) {
      if (additionalUrls[i]) {
        await dispatch(moreImageThunk({ url: additionalUrls[i], spotId}));
      }
    }
    navigate(`/spots/${spotId}`);
  }

  return (
    <>
      <div>
        <h1>Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>Guests will only get your exact address once they&apos;ve have booked a reservation</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
        <label>Country
          <input 
            type="text" value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
        </label>

        <label>Street Address
          <input 
            type="text" value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </label>

        <label>City
          <input 
            type="text" value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
        </label>

        <label>State
          <input 
            type="text" value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
          />
        </label>
        </div>

        <div>
        <label>Description
          <input 
            type="text" value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your scary spot"
            required
          />
        </label>
        </div>
        
        <div>
        <label>Title
          <input 
            type="text" value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Give your spooky spot a title"
            required
          />
        </label>
        </div>

        <div>
        <label>Price per night
          <input 
            type="text" value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
            required
          />
        </label>
        </div>

        <label htmlFor='image'>image</label>
        <input type="text" id="image" name="image" 
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Preview Image"></input>
        <input type="text" id="image-2" name="image"
        onChange={(e) => setUrl2(e.target.value)}
        ></input>
        <input type="text" id="image-3" name="image"
        onChange={(e) => setUrl3(e.target.value)}
        ></input>
        <input type="text" id="image-4" name="image"
        onChange={(e) => setUrl4(e.target.value)}
        ></input>
        <input type="text" id="image-5" name="image"
        onChange={(e) => setUrl5(e.target.value)}
        ></input>

        <button type="submit">Create new Spot</button>
      </form>
    </>
  )
}

export default NewSpot;