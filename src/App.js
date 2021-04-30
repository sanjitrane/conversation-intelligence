import './App.css';
import CallTranscript from './pages/CallTransript'

const data={
  audio:'../data/59e106639d79684277df770d.wav',
  json:'../data/transcript.json'
}
const App=()=>{
  return (
    <div className="App">
      <CallTranscript {...data} />
    </div>
  );
}

export default App;
