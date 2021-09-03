import React from 'react'
import { Card, CardContent, createChainedFunction, Typography } from '@material-ui/core'

const AppStats = ({ title, cases, totalCases}) => {
    return (
        <Card className="statsCard">
            <CardContent>
                <Typography color="textSecondary" className="statsCard__title">
                    {title}
                </Typography>
                <h2 className="statsCard__cases">{cases} Today cases</h2>
                <Typography className="statsCard__totalCases">
                    {totalCases} Total cases
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AppStats
