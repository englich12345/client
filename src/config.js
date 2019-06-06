const END_POINT = `${window.location.hostname}:5000`
const HTTP_END_POINT = `http://${END_POINT}`
const API_END_POINT = `${HTTP_END_POINT}/api`
const WS_END_POINT = `ws://${END_POINT}`

export default {
    END_POINT,
    HTTP_END_POINT,
    API_END_POINT,
    WS_END_POINT,
}
