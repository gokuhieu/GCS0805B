const help=`;[command] 
----list command---
random private code cho 1 làng: ;[village], lấy danh sách toàn bộ ps code làng đó: ;[village] list
thời gian của các item drop hiện tại ;spawm now
xem danh sách đã đăng kí ao làng ;aolang
đăng kí account chơi game ;dangky
điểm danh 24h/1 lần ;diemdanh
;[lệnh-game] số tiền đặt cược
lệnh-game gồm có chan, le, tai, xiu
luật chơi tài xỉu ;taixiu luat
hệ thông đổi coin ra voucher giảm giá sẽ đc update sau
`
let helps
export default helps ={
    category: 'Testing',
    description: 'Bun đẹp trai ơi hãy giúp tôi',
    slash:"both",
    testOnly: true,
    callback: ({ message, interaction }) => {
        message.channel.send(help)
    },
}