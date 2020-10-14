import clds from 'console-log-design-system'

const {makeComment} = clds

const getCurrTime = () => {9
    return `${new Date().getUTCFullYear()}${new Date().getUTCMonth()}${new Date().getUTCDay()}_${new Date().toLocaleDateString()}`
}

const dataLayerModel = {
    acessDate: `${getCurrTime}`,
    lastAccessDate: `${getCurrTime}`,
    clicks: 0
}

let dataLayer = dataLayerModel
let dataLayerHistory = []

const pushDataLayer = data => {
    data.lastAccessDate = getCurrTime()
    data.tema = localStorage.setItem('dataLayer', JSON.stringify(data))
    dataLayer = getDataLayer()
    if(data.acessDate !== data.lastAccessDate) {
        dataLayerHistory.unshift({...data})
    }
    return dataLayer
}

const getDataLayer = (param = undefined, value = undefined) => {
    let dataObj = JSON.parse(localStorage.getItem('dataLayer'))
    if(param !== undefined && value !== undefined) {
        return dataObj[`${param}`] = value
    } else {
        return dataObj
    }
}

const dataLayerInit = () => {
    dataLayer = dataLayerModel
    dataLayerHistory = []
    pushDataLayer(dataLayer)
    makeComment('dataLayerInit', [`Click: ${JSON.stringify(dataLayer.clicks, null, 1)}\nCreated at ${JSON.stringify(dataLayer.lastAccessDate, null, 1)}\ndataLayerHistory:`, `${JSON.stringify(dataLayerHistory, null, 1)}`], 'info', 'sm', 'badgeInverted');
  }

  const updateDataLayer = (key, value) => {
    let newVersion = getDataLayer();
    newVersion[key] = value;
    dataLayer = newVersion;
    pushDataLayer(newVersion);
    let dataLayerLog = dataLayerHistory.map((logItem, logIndex) => `Click: ${dataLayer.clicks - logIndex} | Updated at: ${logItem.lastAccessDate} | Created at: ${logItem.accessDate}\n`);
    makeComment(`updateDataLayer(${key},${value})`, [`Clicks: ${JSON.stringify(dataLayer.clicks, null, 1)}\nUpdated at ${JSON.stringify(dataLayer.lastAccessDate, null, 1)}\ndataLayerHistory:\n${dataLayerLog.join('')}`], 'important', 'sm', 'badgeInverted');
  }