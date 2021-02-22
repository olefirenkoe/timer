import Display from '../src/Display';
import './App.css';
import Header from './Header';
import {useState, useEffect} from 'react';
import {from, observable} from 'rxjs';
import {filter, mergeMap, delay, map} from 'rxjs/operators';
import { fromEvent, interval, merge, noop, NEVER } from 'rxjs';
import {  mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators';


// WHERE YOU Stoped
// const events$ = merge(

// )


// const stopWatch$ = events$.pipe(
//   startWith({
//     count: false,
//     value: 0
//   }),
//   scan((accumulator, current) => {
//     return accumulator + current
//   })
// )
//////////////

// Just for test 
const doIt = (a) => {
  console.log(a)
}
// Just for test 

let numbersObservable = from([1, 2, 3,  4, 5]);
let squaredNumbers = numbersObservable.pipe(
  filter(val => val > 2),
  mergeMap(val => from([val]).pipe(delay(1000*val))),
  map(val => val * val)
);

const useObservable = (observable, setter) => {
  useEffect(() => {
    let subscription = observable.subscribe(result => {
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setter]);
}

function App() {
  const [currentNumber, setCurrentNumber] = useState(0);

  useObservable(squaredNumbers, setCurrentNumber);

  return (
    <div className='container'>
      <Header/>
      <Display currentTime={currentNumber}/>
      <div className='buttons'>
        <button>Start/Stop</button>
        <button onClick={() => doIt(8)}>Wait</button>
        <button>Reset</button>
      </div>
    </div>
  )
}

// const stopwatch$ = new Observable(observer => {
//       let secondsPassed = 0;
//       observer.next(secondsPassed);
//       const stopwatchInterval = setInterval(() => {
//         secondsPassed += 1;
//         observer.next(secondsPassed);
//       }, 1000);
    
//       return () => clearInterval(stopwatchInterval);

//     });




// function App() {
//   const [currentTime, setCurrentTime] = useState(0);
//   const [timeOn, setTimeOn] = useState(false);
  
//   // useEffect(() => {
//   //   const stopwatch$ = interval(1000).pipe(setCurrentTime(1))
//   //   const subscription = stopwatch$.subscribe();
//   //   return () => subscription.unsubscribe();
  

//   useEffect(() => {
//     let interval = null;

//     if (timeOn) {
//       interval = setInterval(() => {
//         setCurrentTime(prevTime => prevTime + 1)
//       }, 1000)
//     } else {
//       clearInterval(interval)
//     }

//     return () => clearInterval(interval)

//     // if (timeOn) {
//     //   const stopwatch = new Observable(observer => {
//     //     let secondsPassed = 0;
//     //     observer.next(secondsPassed);
//     //     const stopwatchInterval = setInterval(() => {
//     //       secondsPassed += 1;
//     //       observer.next(secondsPassed);
//     //     }, 1000);
      
//     //     return () => clearInterval(stopwatchInterval);

//     //   });
//     //     stopwatch.subscribe(secondsPassed => {
//     //      setCurrentTime(secondsPassed);
//     //   });
  
//     // }else {
//     //   // setCurrentTime(0)
//     //   // const stopwatchSubscription = stopwatch.unsubscribe(secondsPassed => {
//     //   //   console.log(secondsPassed);
//     //   // });
//     // } 
  
    

//   }, [timeOn]);

  
 
//   return (
//     <div className='container'>
//       <Header/>
//       <Display currentTime={currentTime}/>
//       <div className='buttons'>
//         <button onClick={() => setTimeOn((timeOn) ? false : true)}>{(timeOn) ? "Stop" : "Start"}</button>
//         <button onClick={() => setTimeOn(false)}>Wait</button>
//         <button onClick={() => setCurrentTime(0)}>Reset</button>
//       </div>
//     </div>
//   );
// }

export default App;
