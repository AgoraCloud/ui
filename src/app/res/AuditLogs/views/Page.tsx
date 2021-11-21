import { useStores } from 'app/stores'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AuditLogQuery } from '..'
// import { DataGrid } from '@mui/x-data-grid';
import { PaginatedTable } from 'app/components'


const columns = [
    {
        id: 'date',
        label: 'Date'
    },
    {
        id: 'resource',
        label: 'Resource'
    },
    {
        id: 'action',
        label: 'Action'
    },
    {
        id: 'fullName',
        label: 'User'
    }
]

export const AuditLogPage = observer(() => {
    const { adminstore } = useStores()
    // console.log("AuditLogPage", toJS(adminstore.auditLogs))
    const auditLogs = adminstore.auditLogs
    // let query: AuditLogQuery|undefined
    const [query, setQuery] = React.useState<AuditLogQuery | undefined>(undefined)
    React.useEffect(() => {
        setQuery(auditLogs.get(0, 100))
    }, [])
    if (!query) return <div> Not Query </div>
    if (query.state !== 'loaded') return <div>
        Audit Logs Not Loaded
    </div>
    // console.log(query)
    return <div>
        <PaginatedTable
            rows={query.logs}
            columns={columns}
        />
    </div>
})