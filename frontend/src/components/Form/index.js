import { useState, useEffect } from 'react'
import {  Text, Input, Button, Radio } from '@geist-ui/core'
import { useNavigate } from "react-router-dom";

import { updatePlanet, createPlanet } from '../../services'

const checkForLetter = (str, type) => {
  const inputStr = str.replace(/,/g, '')
  if (inputStr.length === 0) return true
  const regex = type === 'number' ? new RegExp('^[0-9]*$') : new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
  return !regex.test(inputStr)
}

const Form = ({planet, mode}) => {
  const [planetState, setPlanetState] = useState(planet)
  const [haveChanges, setHaveChanges] = useState(false)

  const navigate = useNavigate();
  const handleInputChange = (event) => {
   const { value, type, name } = event.target
   setHaveChanges(true)
    if(type === 'number'){
      if(name === 'satellite'){
        if(!checkForLetter(value, 'number')){
          setPlanetState(prevState => {
            return {
              ...prevState,
              [name]: Number(value) 
            }
          })
        }
      }else{
        if(!checkForLetter(value, 'decimal')){
          setPlanetState(prevState => {
            return {
              ...prevState,
              [name]: parseFloat(value) 
            }
          })
        }
      }
    }else{
      setPlanetState(prevState => {
        return {
          ...prevState,
          [name]: value 
        }
      })
    }
  }

  const onRadioChange = (val) => {
    setHaveChanges(true)
    setPlanetState(prevState => {
      return {
        ...prevState,
        haveWater: val
      }
    })
  }
  const handleSubmit = async (e) => {
      try{
        if(mode === "update") {
          const {_id, ...updatedFields} = planetState
          const response = await updatePlanet(planetState.name, JSON.stringify(updatedFields))
        }else {
          const {_id, ...createFields} = planetState
          const response = await createPlanet(createFields)
        }
        e.preventDefault()
        navigate('/')
        window.location.reload()
    }catch(e) {
      console.log('Error', e)
    }
  }

  useEffect(() => {
    if(planet._id !== planetState._id) {
      setPlanetState(planet)
    }
  }, [planet, setPlanetState, planetState._id])

  return (
    <form className="formContainer">
    <Text h3>{mode === "update" ? "Update" : "Create new"} planet</Text>
    <label>
    Planet name:
    <Input name="name" htmlType="text" required value={planetState.name} onChange={handleInputChange}/>
    </label>
    <label>
    Satellite:
    <Input name="satellite" htmlType="number" required value={planetState.satellite} onChange={handleInputChange} />
    </label>
    <label>
    Orbital period:
    <Input name="orbitalPeriod" htmlType="number" required value={planetState.orbitalPeriod} onChange={handleInputChange} />
    </label>
    <label>
      Have water?
    <Radio.Group value={planetState.haveWater} onChange={onRadioChange} required useRow>
      <Radio value={true}>True</Radio>
      <Radio value={false}>False</Radio>
    </Radio.Group>
    </label>
    {haveChanges ? <Button type="success" onClick={handleSubmit}>Save changes</Button> : null}
  </form>
  )
}

export default Form