
const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateFile extends cc.Component {

    @property(cc.EditBox)
    file1_id: cc.EditBox = null
    @property(cc.EditBox)
    file1_name: cc.EditBox = null
    @property(cc.EditBox)
    file1_gap: cc.EditBox = null

    @property(cc.EditBox)
    file2_id: cc.EditBox = null
    @property(cc.EditBox)
    file2_interface: cc.EditBox = null
    @property(cc.EditBox)
    file2_src_addr: cc.EditBox = null
    @property(cc.EditBox)
    file2_gap: cc.EditBox = null

    @property(cc.JsonAsset)
    userData: cc.JsonAsset = null

    // onLoad () {}

    start() {
        //this.saveForBrowser('Hello world','File1.txt')
    }


    createFile1() {
        let f1_id = parseInt(this.file1_id.string)
        let f1_name = parseInt(this.file1_name.string)
        let f1_gap = parseInt(this.file1_gap.string)
        let str: string = ''

        let arr: any[] = this.userData.json
        for (let i = 0; i < arr.length; i++) {
            let server = arr[i][0]
            let username = arr[i][2]
            let passwd = arr[i][3]

            str +=
                'id=' + f1_id + ' enabled=yes name=pptp' + f1_name + ' comment= server=' + server + ' server_port=1723 username=' + username + ' passwd=' + passwd + ' interface=auto upload= download= mtu=1400 mru=1400 timing_rst_switch=0 timing_rst_week=1234567 timing_rst_time=00:00,, qos_switch=0'

            str += '\r\n'

            f1_id += f1_gap
            f1_name += f1_gap
        }


        this.saveForBrowser(str, 'File1.txt')
        /**
         * id=71 enabled=yes name=pptp71 comment= server=221.179.69.72 server_port=1723 username=zhuwen passwd=628628 interface=auto upload= download= mtu=1400 mru=1400 timing_rst_switch=0 timing_rst_week=1234567 timing_rst_time=00:00,, qos_switch=0
         */
    }

    createFile2() {
        let f2_id = parseInt(this.file2_id.string)
        let f2_interface = parseInt(this.file2_interface.string)
        let f2_src_addr = parseInt(this.file2_src_addr.string)
        let f2_gap = parseInt(this.file2_gap.string)
        let str: string = ''

        let arr: any[] = this.userData.json
        for (let i = 0; i < arr.length; i++) {

            str +=
                'id=' + f2_id + ' enabled=yes comment= type=0 nexthop= interface=pptp' + f2_interface + ' src_addr=172.16.4.' + f2_src_addr + ' dst_addr= protocol=any src_port= dst_port= iface_band=1 week=1234567 time=00:00-23:59'
            str += '\r\n'

            f2_id += f2_gap
            f2_interface += f2_gap
            f2_src_addr += f2_gap
        }


        this.saveForBrowser(str, 'File2.txt')
        /**
         id=31 enabled=yes comment= type=0 nexthop= interface=pptp31 src_addr=172.16.4.100 dst_addr= protocol=any src_port= dst_port= iface_band=1 week=1234567 time=00:00-23:59
         */
    }

    // 保存字符串内容到文件。
    // 效果相当于从浏览器下载了一个文件到本地。
    // textToWrite - 要保存的文件内容
    // fileNameToSaveAs - 要保存的文件名
    saveForBrowser(textToWrite, fileNameToSaveAs) {
        if (cc.sys.isBrowser) {
            console.log("浏览器");
            let textFileAsBlob = new Blob([textToWrite], { type: 'application/json' });
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.

                // downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                // downloadLink.onclick = destroyClickedElement;
                // downloadLink.style.display = "none";
                // document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    }

    // update (dt) {}
}
