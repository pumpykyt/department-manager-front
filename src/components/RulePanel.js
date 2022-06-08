import { Table, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteRuleMutation, useGetRulesQuery, usePostRuleMutation } from "../apis/ruleApi";

function RulePanel(){

    const [showModal, setShowModal] = useState(false);
    const [addRuleModel, setAddRuleModel] = useState({text: ''});

    const rulesResponse = useGetRulesQuery();
    const [deleteRule] = useDeleteRuleMutation();
    const [addRule] = usePostRuleMutation();

    const ruleColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'ruleId'
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'ruleText'
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <div className="flex gap-x-5">
                    <button onClick={() => handleDeleteRule(record.id)} className="px-3 py-2 text-white bg-red-500 rounded-lg">Delete</button>
                </div>  
            )
        }
    ];

    const handleDeleteRule = id => {
        deleteRule(id).unwrap().then(response => {
            toast.success('Successfully deleted');
        }).catch(error => {
            toast.error('Server error');
        });
    }

    const handleAddRule = () => {
        addRule(addRuleModel).unwrap().then(response => {
            toast.success('Successfully added');
            setShowModal(false);
        }).catch(error => {
            toast.error('Server error');
        });
    }

    return(
        <div className="rule-panel bg-blue-400 min-h-screen">
            <Modal footer={null} title="Add rule" visible={showModal} onCancel={() => setShowModal(false)}>
                <input value={addRuleModel.text} onChange={e => setAddRuleModel({text: e.target.value})} className="block focus:outline-none text-lg p-1 w-100 bg-gray-200 mb-5" placeholder="Rule text" type="text"/>
                <button onClick={handleAddRule} className="w-full py-2 bg-green-500 text-white rounded-lg">Post</button>
            </Modal>
            <div className="container mx-auto pt-36">
                <p className="text-white text-3xl font-bold mb-5">Rule panel</p>
                <button onClick={() => setShowModal(true)} className="bg-green-500 px-3 py-2 rounded-lg mb-5 text-white">Add rule</button>
                {
                    !rulesResponse.isLoading && !rulesResponse.error &&
                    <Table dataSource={rulesResponse.data} columns={ruleColumns}/>
                }
            </div>
        </div>
    )
}

export default RulePanel;