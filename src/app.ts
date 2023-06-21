


const W = 500;
const H = 500;
const SEED_NUM = 10;
const TOTAL = W * H;
let _ctx: CanvasRenderingContext2D;
let _seedData: ImageData
let _seedBuffer: Uint32Array;
let _uvData: Uint32Array;


const setup = (canvas: HTMLCanvasElement) => {
    _ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    canvas.width = W;
    canvas.height = H;
}

const createSeedPoint = () => {
    for (let i = 0; i < SEED_NUM; i++) {
        const x = ~~(Math.random() * W);
        const y = ~~(Math.random() * H);
        const color = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`;
        _ctx.beginPath();
        _ctx.fillStyle = color;
        _ctx.fillRect(x, y, 1, 1);
        _ctx.fill();
        _ctx.closePath();
    }
    // vonoroi를 구성에 사용할 seed컬러 설정
    _seedData = _ctx.getImageData(0, 0, W, H);
    _seedBuffer = new Uint32Array(_seedData.data.buffer);

    _uvData = new Uint32Array(_seedBuffer.length).fill(1010);
    // seed컬러가 있는 좌표정보를 uv에 기억
    for (let i = 0; i < _seedBuffer.length; i++) {
        if (_seedBuffer[i]) {
            _uvData[i] = i;
        }
    }
}

/**
 * jump flooding 함수
 * step에 해당하는 주변좌표를 seed컬러로 채우기 시작
 * @param step 
 */
let updateFrame = 0;
const NOTIFY_FRAME = ~~(TOTAL / 10)
function* jfa(step: number) {
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const pixelIndex = y * W + x;
            let nearSeed = -1;
            let nearDistance = Infinity;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    const y0 = y + j * step;
                    const x0 = x + i * step;
                    const m = y0 * W + x0;
                    if (!_seedBuffer[m] || x0 < 0 || x >= W || y0 < 0 || y >= H) {
                        continue;
                    }
                    const uv = _uvData[m];
                    const d = (x - uv % W) ** 2 + (y - uv / W | 0) ** 2;
                    if (nearDistance > d) {
                        nearDistance = d;
                        nearSeed = uv;
                    }
                }
            }
            // 찾은 컬러가 없으면 skip
            if (nearSeed === -1) {
                continue;
            }
            _uvData[pixelIndex] = nearSeed;
            _seedBuffer[pixelIndex] = _seedBuffer[nearSeed];
            // buffer 업데이트가 일정치 이상 되면 제너레이터를 통한 업데이트 처리
            if (++updateFrame % NOTIFY_FRAME === 0) {
                _ctx.putImageData(_seedData, 0, 0);
                yield _ctx.canvas;  //통제권을 호출한 곳으로
            }
        }
    }
}




function* startJFA() {
    //반복횟수 step구하기
    const maxStep = 2 ** (Math.ceil(Math.log2(W)) - 1);
    for (let step = maxStep; step >= 1; step >>= 1) {
        yield* jfa(step);
    }
    _ctx.putImageData(_seedData, 0, 0);
    yield _ctx.canvas; //가져온 통제권을 다시 반환
}


const startApp = () => {
    const gen = startJFA();
    const _loop = () => {
        setTimeout(() => {
            const r = gen.next();
            if (!r.done) {
                _loop();
            }
        }, 500);
    }
    _loop();
}

function initApp(canvas: HTMLCanvasElement) {
    setup(canvas);
    createSeedPoint();
    startApp();
}




export default initApp;