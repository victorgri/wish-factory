/* eslint-disable react-hooks/exhaustive-deps */
import {Route, Routes} from 'react-router-dom'

import { Header } from "./components/Header"
import { Footer } from "./components/Footer/Footer"
import { Main } from './components/Main'
import { About } from './components/About/About'
import { Wishes } from './components/Wishes/Wishes'
import { useEffect, useState } from 'react'
import { Wish } from './types/Wish'
import { Request } from './components/Request/Request'
import { Report } from './components/Report/Report'
import { Donate } from './components/Donate/Donate'
import { BallTriangle } from 'react-loader-spinner'


function App() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [visible, setVisible] = useState<Wish[]>([...wishes]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    fetch("https://wish-factory.onrender.com/api/dream/dreams/")
      .then((res) => res.json())
      .then(wishesServer => {
        setWishes(wishesServer)
      });
    setIsLoaded(true)
  },
  []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/wishes"
          element={
            isLoaded ? (
              <Wishes
                wishes={wishes}
                visible={visible}
                setVisible={setVisible}
              />
            ) : (
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )
          }
        />
        <Route path="/request" element={<Request wishes={wishes} />} />
        <Route path="/reports" element={<Report data={wishes} />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
