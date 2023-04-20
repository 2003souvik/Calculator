import './App.css';
import React, { useReducer } from 'react'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
export const ACTIONS={
  ADD_DIGIT:"add-digit",
  CLEAR:"clear",
  DELETE:"delete",
  OPERATION:"choose",
  EVALUATE:"evaluate"
}
function reducer(state,{type,payload}){
   switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          current:payload.digit,
          overwrite:false,
        }
      }
      if(payload.digit==="0" && state.current==="0")return state
      if(payload.digit==="." && state.current.includes("."))return state

      return{
        ...state,
        current:`${state.current || ""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
       return {}
    case ACTIONS.OPERATION:
      if(state.current == null && state.previous==null){
        return state
        
      }
      if(state.current==null){
        return{
          ...state,
          operation:payload.operation,
        }
      }
      if(state.previous==null){
        return{
          ...state,
          operation:payload.operation,
          previous:state.current,
          current:null,
        }
      }
      return{
        ...state,
        previous:evaluate(state),
        operation:payload.operation,
        current:null
      }
    case ACTIONS.EVALUATE:
      if(state.operation ==null || state.current == null || state.previous==null){
        return state
      }
      return{
        ...state,
        overwrite:true,
        previous:null,
        operation:null,
        current:evaluate(state),

      }
    case ACTIONS.DELETE:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          current:null
        }
      }
      if(state.current==null)return state
      if(state.current.length===1){
        return{
          ...state,
          current:null
        }
      }
      return{
        ...state,
        current:state.current.slice(0,-1)
      }

   }
}
function evaluate({current,previous,operation}){
   const prev=parseFloat(previous)
   const curr=parseFloat(current)
   if(isNaN(prev) || isNaN(curr))return ""
   let compute=""
   switch(operation){
    case "+":
      compute=prev+curr
      break
    case "-":
      compute=prev-curr
      break
    case "*":
      compute=prev*curr
      break
    case "/":
      compute=prev/curr
      break

   }
   return compute.toString()
}
export default function App() {
  const[{current,previous,operation},dispatch]=useReducer(reducer,{});

  return (
      <div className='main'>
      < div className="calculator-grid">
        <div className="output">
          <div className="previous">{previous} {operation}</div>
          <div className="current">{current}</div>
        </div>
      
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>
       AC
      </button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE})}>
      DEL
      </button>
     <OperationButton operation="/"dispatch={dispatch} />
     <DigitButton digit="1" dispatch={dispatch} />
     <DigitButton digit="2" dispatch={dispatch} />
     <DigitButton digit="3" dispatch={dispatch} />
     
     <OperationButton operation="*"dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+"dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      
      <OperationButton operation="-"dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
    
      <button className='span-two' onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
    </div>
  )
}

