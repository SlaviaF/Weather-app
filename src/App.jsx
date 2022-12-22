import React, { useState, useEffect, useRef } from 'react';

import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im'


const APIkey = "e07b781da574813e3f07d737405e89b2"
const date = new Date();



function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Copenhagen');
  const [inputValue, setInputValue] = useState('');
  const [err, setErr] = useState(null);
  const inputRef = useRef(null);

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue)
    }
    e.preventDefault();
    inputRef.current.value = "";

  }

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`
    async function fetchData() {
      const response = await fetch(url)
      if (response.ok) {
        const weatherData = await response.json()
        setErr(null)
        setData(weatherData)
      } else
        setErr("Enter valid city/country")
    }
    fetchData()

  }, [location])
  if (!data) {
    return (
      <div><ImSpinner8 className='text-5xl animate-spin' /></div>
    )
  }
  let icon;

  // eslint-disable-next-line default-case
  switch ('Clouds') {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy />;
      break;
    case 'Clear':
      icon = <IoMdSunny />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break;
    case 'Snow':
      icon = <IoMdSnow />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;

  }
  return (
    <div className='h-screen w-full' >
      <div className='bg-hero bg-cover bg-center w-full h-full flex flex-col items-center justify-center '>
        <form className='max-h-14 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8'>
          <div className='h-full relative flex items-center justify-between p-2'>
            <input ref={inputRef} onChange={handleInput} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-sm font-light pl-6 h-full'
              type='text' placeholder='Seach by city or country' />
            <button onClick={handleSubmit} className='bg-blue-600 hover:bg-blue-500 w-20 h-10 rounded-full flex items-center justify-center'>
              <IoMdSearch className="text-white text-lg" />
            </button>
          </div>
          <div className="my-2 rounded flex justify-center text-red-900 bg-white/30 px-5">{err}</div>
        </form >
        <div className=' w-full max-w-[450px]  bg-black/50 min-h-[450px] text-white rounded-2xl backrop-blur-md py-12 px-6'>
          <div className="flex items-center gap-x-5">
            <div className='text-5xl'>{icon}</div>
            <div>
              <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
              <div>{date.getUTCDate()}/{date.getUTCMonth()}/{date.getUTCFullYear()}</div>
            </div>

          </div>
          <div className="my-10">
            <div className="flex justify-center items-center">
              <div className='text-[60px] sm:text-[144px] text-center leading-none'>{Math.floor(data.main.temp)}</div>
              <TbTemperatureCelsius className="text-lg sm:text-4xl -mt-14" />
            </div>
            <div className='capitalize  text-center font-bold text-lg'>{data.weather[0].description}</div>
          </div>
          <div className='max-w-[378px] flex flex-col gap-4  mx-auto'>
            <div className=' flex justify-between'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-sm sm:text-[20px]'>
                    <BsEye />
                  </div>

                  <span className='text-xs sm:text-sm'>Visibility</span>
                </div>
                <span className='ml-2 text-xs sm:text-sm'>{data.visibility / 1000} km</span>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-sm sm:text-[20px]'>
                    <BsThermometer />
                  </div>


                  <span className='text-xs'>Feels like</span>
                </div>
                <div className='ml-2 text-xs sm:text-sm flex'>{parseInt(data.main.feels_like)}<TbTemperatureCelsius /> </div>
              </div>
            </div>
            <div className='flex justify-between'>

              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-sm sm:text-[20px]'>
                    <BsWater />
                  </div>

                  <span className='text-xs sm:text-sm'>Humidity</span>
                </div>
                <span className='ml-2 text-xs sm:text-sm'>{data.main.humidity} % </span>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-sm sm:text-[20px]'>
                    <BsWind />
                  </div>


                  <span className='text-xs sm:text-sm'>Wind</span>
                </div>
                <span className='ml-2 text-xs sm:text-sm'>{data.wind.speed}m/s</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
