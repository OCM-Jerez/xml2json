.- Lineas fichero JSON.




Licitaciones con menores, datos que extraemos de cada elem:

{
"id"
"link"
"summary"
"title"
"updated"
"cac-place-ext:ContractFolderStatus"
        "cbc-place-ext:ContractFolderStatusCode"                  Los valores son diferentes que contratos menores
        "cac:ProcurementProject"
                "cbc:Name"                                        Descripcion, contenida en summary.
                "cbc:TypeCode"
                "cbc:SubTypeCode"   
                "cac:BudgetAmount"  
                        "cbc:EstimatedOverallContractAmount"
                        "cbc:TotalAmount"
                        "cbc:TaxExclusiveAmount"
                "cac:RequiredCommodityClassification"
                        "cbc:ItemClassificationCode"              Codigo de lo que se compra, tiene muchos valores.
                "cac:PlannedPeriod"
                        "cbc:StartDate"
                        "cbc:EndDate"
        "cac:TenderResult"                                        Falta en algunas licitaciones
                        "cac:WinningParty"                        Puede tener varios elementos
                               "cac:PartyIdentification"
                               "cac:PartyName"          
        "cac:TenderingProcess"                                             
                    "cbc:ProcedureCode"
                    "cbc:UrgencyCode"
}




