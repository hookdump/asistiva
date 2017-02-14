"""
Receive data from Pupil server broadcast over TCP
test script to see what the stream looks like
and for debugging
"""
import zmq
import json

#network setup
port = "5000"
context = zmq.Context()
socket = context.socket(zmq.SUB)
socket.connect("tcp://192.168.0.22:"+port)

# recv all messages
socket.setsockopt(zmq.SUBSCRIBE, '')
# recv just pupil postions
# socket.setsockopt(zmq.SUBSCRIBE, 'pupil_positions')
# recv just gaze postions
# socket.setsockopt(zmq.SUBSCRIBE, 'gaze_positions')

while True:
    topic,msg =  socket.recv_multipart()
    msg = json.loads(msg)
    print  "\n\n",topic,":\n",msg
