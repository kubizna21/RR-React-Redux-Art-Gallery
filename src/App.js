import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  reset,
  fetchData,
  nextImage,
  prevImage,
  setArtId
} from './features/dataSlice';


const mapStateToProps = state => {
  return state.data;
};


function App({artId, isLoggedIn}) {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchData());
  }, [artId, dispatch])


  const renderImage = () => {
    return currentState.apiData ?
      <img src={currentState.apiData.primaryImage} />
      :
      <h3>No Image Available</h3>

  }
  return (
    <div className='App' style={ { 'backgroundColor': isLoggedIn ? 'red' : 'yellow'}}>
      <div className='button-container'>
        <button onClick={
          () => dispatch(fetchData())
        }>Trigger Thunk</button>
        <button onClick={
          () => dispatch(reset())
        }>Reset</button>
        <button onClick={
          () => dispatch(nextImage())
        }>Next Image</button>

        <button onClick={
          () => dispatch(prevImage())
        }>Back Thunk</button>
      </div>
      <div className='input-controls'></div>
          <h1>{ currentState.artId}</h1>
          <input type='text' value={currentState.artId} onChange={e => dispatch(setArtId(e.target.value))}/>
      <div className='image-container'>
        {
          renderImage()
        }
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(App);