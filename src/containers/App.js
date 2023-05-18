import React, { useState, useEffect} from "react";
import CardList from "../component/CardList";
import SearchBox from "../component/SearchBox";
import Scroll from "../component/Scroll";
import ErrorBoundary from "../component/ErrorBoundary";

function App() {

    const [robots, setRobots] = useState([])
    const [searchfield, setsearchfield] = useState('')
    const [count, setCount] = useState(0)

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
    }, [count])
    const onSearchChange = (event) => {
        setsearchfield(event.target.value)
    }

     const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        });

        return !robots.length ?
            <div className='tc'><h1>Loading....</h1></div> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <button
                        className= 'pa3 ba--green bg-lightest-blue'
                        onClick={() =>setCount(count+1)}>Download!</button>
                    <h3>Download all active users from server</h3>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary >
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
}

export default App