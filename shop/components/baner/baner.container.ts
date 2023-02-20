import React from 'react'
import { Baner } from './baner'
import { newBanerViewModel } from './baner.view-model'

export const BanerContainer = () => {
    const { visible, agree, disagree } = newBanerViewModel()

    return React.createElement(Baner, {
        visible,
        agree,
        disagree,
    })
}
