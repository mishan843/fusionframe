import React from 'react';

const StepperAudit = ({ auditData }) => {
    console.log(auditData, 'audit');

    const containerStyle = {
        backgroundColor: 'white',
        color: '#009efb',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        borderRadius: '5px',
    };

    const dateHeaderStyle = {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#009efb',
        marginBottom: '10px',
        marginTop: '20px',
        display: 'flex',
        alignItems: 'start',
    };

    const contentItemStyle = {
        display: 'flex',
        marginBottom: '20px',
        alignItems: 'flex-start',
    };

    const detailsContainerStyle = {
        flex: 1,
        padding: '10px 20px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const actionStyle = {
        fontSize: '16px',
        color: 'black',
    };

    const timeStyle = {
        fontSize: '12px',
        color: '#67757c',
    };

    const noDataStyle = {
        fontSize: '16px',
        color: '#67757c',
        textAlign: 'center',
        marginTop: '20px',
    };

    // Group audit data by date
    const groupedData = auditData.reduce((acc, item) => {
        const { Date } = item;
        if (!acc[Date]) {
            acc[Date] = [];
        }
        acc[Date].push(item);
        return acc;
    }, {});

    const isEmpty = auditData.length === 0;

    return (
        <div style={containerStyle}>
            {isEmpty ? (
                <div style={noDataStyle}>No audit trail</div>
            ) : (
                Object.keys(groupedData).map(date => (
                    <div key={date}>
                        <div style={dateHeaderStyle}>
                            <span>{date}</span>
                        </div>
                        {groupedData[date].map((item, index) => (
                            <div key={index} style={contentItemStyle}>
                                <div style={detailsContainerStyle}>
                                    <div style={actionStyle}>
                                        {`Action performed by ${item.name} (${item.email})`}
                                    </div>
                                    <div style={timeStyle}>{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default StepperAudit;
