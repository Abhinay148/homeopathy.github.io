const firebaseConfig = {
    apiKey: "AIzaSyDu9ScIffZDTMsMhkntcISzkbBuUMMhQ6c",
    authDomain: "reports-c8d76.firebaseapp.com",
    projectId: "reports-c8d76",
    storageBucket: "reports-c8d76.appspot.com",
    messagingSenderId: "630249576609",
    appId: "1:630249576609:web:63cd475e39cc892378b8e0",
    measurementId: "G-BNXGZPD1C0"
  };

  firebase.initializeApp(firebaseConfig);

  var id = localStorage.getItem('appointmentData');
  console.log(id);
var fileText = document.querySelector(".fileText");
var progressupload = document.querySelector(".progressupload");
var progress = document.querySelector(".progress");
var percentval;
var fileitem;
var filename;
var fileLink = document.querySelector(".fileLink");

function getfile(e) {
    fileitem = e.target.files[0];
    filename = fileitem.name;
    fileText.innerHTML = filename;
}

function uploadFile() {
    let storageRef = firebase.storage().ref("pdfs/" + filename);
    let uploadTask = storageRef.put(fileitem);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            console.log(snapshot);
            percentval = Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(percentval);
            progressupload.innerHTML = percentval + "%";
            progress.style.width = percentval + "%";
        },
        (error) => {
            console.log("error", error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async(url) => {
                console.log("URL", url);
                const res= await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
                    method:'PUT',
                    headers:{
                        'content-type':"application/JSON",
                        'auth-Token':localStorage.getItem("authToken")
                    },
                    body:JSON.stringify({pdf:url})
                })

                if (url != "") {
                    fileLink.setAttribute("href", url);
                    fileLink.innerHTML = "Download PDF";
                    fileLink.style.display = "block";
                }
            });
        }
    );
}
