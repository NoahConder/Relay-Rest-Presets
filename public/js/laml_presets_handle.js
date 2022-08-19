let laml_box = document.getElementById("laml_box_text");
let selection_input = document.getElementById("mode_select")
let number = "123-456-7890"
let number_message = "123-456-7890"
let text_res;


/// Voice Forwarding
$('#voice_forward').on('click', function () {
    selection_input.value = 'voice'
    number = prompt("Enter the phone number that it will be forwarded to.", "815-100-4302")
    laml_box.textContent =`<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <Response>
        <Dial callerId='{{From}}'>${number}</Dial>
    </Response>`
    if (number == null) {
        number = "123-456-7890"
        laml_box.textContent = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <Response>
        <Dial callerId='{{From}}'>${number}</Dial>
    </Response>`
}
})
/// Record Calls
$('#record').on('click', function () {
    selection_input.value = 'voice'
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
}
})
/// Conference Room
$('#conference').on('click', function () {
    selection_input.value = 'voice'
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference>Room A1</Conference>
  </Dial>
</Response>`

})
/// Voicemail
$('#voice_mail').on('click', function () {
    selection_input.value = 'voice'
    text_res = prompt("Enter what you'd like it to say.", "Please leave a message with your name and number at the beep.")
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>
        ${text_res}
        Press the pound key when finished.
    </Say>
    <Record
        action='https://noah-space.signalwire.com/laml-bins/bed42d52-5f40-4b0f-ae0b-fd825fa3ce20'
        maxLength="15"
        finishOnKey="#"
        />
</Response>`
})












/// Respond with SMS
$('#sms_simple').on('click', function () {
    selection_input.value = 'sms'
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
    selection_input.value = 'sms'
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
    selection_input.value = 'sms'
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
    selection_input.value = 'fax'
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Receive action="/fax/received"/>
</Response>`
})
/// Fax image capture

$('#fax_image').on('click', function () {
    selection_input.value = 'fax'
    laml_box.textContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Receive mediaType="image/tiff"></Receive>
</Response>`
})
