$("#btn-back").on("click",function() {
  window.location = "index.html";
});

function readFile() {
   var type =window.TEMPORARY;
   var size = 5*1024*1024 -1;
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
   window.requestFileSystem(type, size, successCallback, errorCallback);

   function successCallback(fs) {

      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
              ons.notification.alert(this.result);
              console.log(this.result);
            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
     ons.notification.alert("ERROR: " + error.code);
      alert("ERROR: " + error.code)
   }

}

function createFile() {
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

      console.log('file system open: ' + fs.name);
      createFile(fs.root, "newTempFile.txt", false);

  }, onErrorLoadFs);


   var type = window.TEMPORARY;
   var size = 5*1024*1024 - 1;
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
   window.requestFileSystem(type, size, successCallback, errorCallback);

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
        ons.notification.alert("File creation successfull");
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
     ons.notification.alert("ERROR: " + error.code);
      alert("ERROR: " + error.code)
   }

}

function writeFile() {
   var type =window.TEMPORARY;
   var size = 5*1024*1024 -1;
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
   window.requestFileSystem(type, size, successCallback, errorCallback);

   function successCallback(fs) {

      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
              ons.notification.alert("Write completed");
               alert('Write completed.');
            };

            fileWriter.onerror = function(e) {
              ons.notification.alert("Writle failed "+e.toString());
               alert('Write failed: ' + e.toString());
            };

            var blob = new Blob(['Eu recha, Eu :*'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);

      }, errorCallback);

   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
      ons.notification.alert("ERROR: " + error.code);
   }

}

function writeFileFromSDCard() {
ons.notification.alert("write");
   var writer = new FileWriter("/storage/sdcard0/Android/data/io.cordova.hellocordova/cache/write.txt");
   writer.write(  "holi\n", false);
   alert("file Written to SD Card");
}
