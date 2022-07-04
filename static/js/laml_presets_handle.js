let laml_box = document.getElementById("laml_box_text");
let number = "123-456-7890"
let selection = ""
let number_message = "123-456-7890"
//let bin_voice = ""

/// Voice Forwarding
$('#voice_forward').on('click', function () {
    selection = "Voice Forwarding"
    number = prompt("Please enter your desired phone number", "815-100-4302")
    laml_box.textContent =`<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <Response>
        <Dial callerId='{{From}}'>${number}</Dial>
    </Response>`
    if (number == null) {
        selection = "Voice Forwarding"
        number = "123-456-7890"
        laml_box.textContent = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <Response>
        <Dial callerId='{{From}}'>${number}</Dial>
    </Response>`
}
})

/// Voice Mail
/*$('#voice_mail').on('click', function () {
    selection = "Voice Mail"
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>
        Please leave a message at the beep.
        Press the pound key when finished.
        (Feel free to change this text)
    </Say>
    <Record
        action="${bin_voice}"
        method="GET"
        maxLength="15"
        finishOnKey="#"
        />
</Response>`
})
*/
/// Record Calls
$('#record').on('click', function () {
    selection = "Record Calls"
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Record/>
</Response>`
    if (confirm("Do you want it transcribed?") === true) {
        laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Record
        transcribe="true"/>
</Response>`
}   else {
        alert("Okay, just a regular recording!");
        selection = "Transcribe Calls"
}
})
/// Conference Room
$('#conference').on('click', function () {
    selection = "Conference Room"
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference>Room A1</Conference>
  </Dial>
</Response>`

})

/// Respond with SMS
$('#sms_simple').on('click', function () {
    selection = "Respond with SMS"
    if (confirm(`Please note: Any SMS & MMS sent into or from the United States must have a campaign. if you want to learn more, please press "OK"`)) {
        window.open("https://developer.signalwire.com/apis/docs/campaign-registry-all-you-need-to-know", "_blank")
        laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>Hello from SignalWire!</Message>
</Response>`

}   else {
        laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>Hello from SignalWire!</Message>
</Response>`
}
})
/// Respond with MMS
$('#mms_simple').on('click', function () {
    selection = "Respond with MMS"
    if (confirm(`Please note: Any SMS & MMS sent into or from the United States must have a campaign. if you want to learn more, please press "OK"`)) {
        window.open("https://developer.signalwire.com/apis/docs/campaign-registry-all-you-need-to-know", "_blank")
        laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Hello from SignalWire!</Body>
        <Media>https://link.to/your-media-file</Media>
    </Message>
</Response>`

}   else {
        laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Hello from SignalWire!</Body>
        <Media>https://link.to/your-media-file</Media>
    </Message>
</Response>`
}
})

/// Message Forwarding
$('#message_forward').on('click', function () {
    if (confirm(`Please note: Any SMS & MMS sent into or from the United States must have a campaign. if you want to learn more, please press "OK"`)) {
        number_message = prompt("Please enter your desired phone number. Please note: This uses E164 Format.", "+18151004302")
        window.open("https://developer.signalwire.com/apis/docs/campaign-registry-all-you-need-to-know", "_blank")
        laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message to='${number_message}'> You received a message from {{From}} saying: "{{Body}}" </Message>
</Response>`
}   else {
        number_message = prompt("Please enter your desired phone number. Please note: This uses E164 Format.", "+18151004302")
        laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message to='${number_message}'> You received a message from {{From}} saying: "{{Body}}" </Message>
</Response>`
}
})

/// Fax receive
$('#fax_receive').on('click', function () {
    selection = "Receive Fax"
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Receive action="/fax/received"/>
</Response>`
})
/// Fax image capture

$('#fax_image').on('click', function () {
    selection = "Fax image capture"
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Receive mediaType="image/tiff"></Receive>
</Response>`
})
