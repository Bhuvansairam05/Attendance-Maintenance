import './App.css'

function App() {

  return (
    <>
      <body>
        <header>
            <div class="title">
            <div class="logo"></div>
            <h1>Attendee</h1>
        </div>
        <div class="rightHeader">
            <a href="index.html" class="noStyle"><div class="home">
                Home
            </div></a>
            <a href="about.html" class="noStyle"><div class="about">
                About
            </div></a>
            <a class="noStyle" href="login.html"><div class="login">
            <h3 align="center">Login</h3>
            </div></a>
        </div>
        </header>
        <main>
          <h1>Welcome to Attendance Maintenance System</h1>
        <div class="main_content">
            <div class="leftText">
                This System tracks Attendance for specifically tailored for 
                blue-collar workers. Whether you're an admin managing multiple 
                projects, a project lead overseeing on-site workers, or a worker
                 clocking in and out—this platform ensures a smooth and 
                 transparent attendance process.
                 <a class="noStyle more" href="about.html"><h6>More</h6><i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div class="rightImage">
            </div>
        </div>
        <br /><br />
        <div class="main_content">
            <div class="leftImage"></div>
            <div class="rightText">
                <h4>Key Features</h4>
                <ul>
                    <li>Easy to track Attendance.</li>
                    <li>Role-based login greeting and navigation.</li>
                    <li>Adding new project is simple.</li>
                </ul>
            </div>
        </div>
        <br /><br /><br /><br /> 
        </main>
        <footer>
          <p>&copy; 2025 Attendance Maintenance System</p>
        </footer>
      </body>
    </>
  )
}

export default App
