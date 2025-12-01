import React, { useState, useMemo } from 'react';
import { 
  GitBranch, Folder, FileText, ChevronRight, ChevronDown, Plus, 
  MoreVertical, Star, Trash2, Edit2, Check, X, Search 
} from 'lucide-react';
import { KnowledgeNode } from '../types';

// --- MOCK DATA ---
const INITIAL_NODES: KnowledgeNode[] = [
  // HIGH SCHOOL MATH
  { id: 'K1', title: '集合与常用逻辑用语', type: 'Chapter', stage: 'High', subject: 'Math', parentId: undefined },
  { id: 'K1-1', title: '集合的概念', type: 'Section', stage: 'High', subject: 'Math', parentId: 'K1' },
  { id: 'K1-1-1', title: '集合的含义与表示', type: 'Point', stage: 'High', subject: 'Math', parentId: 'K1-1', difficulty: 1, importance: 'Core' },
  { id: 'K1-1-2', title: '集合间的基本关系', type: 'Point', stage: 'High', subject: 'Math', parentId: 'K1-1', difficulty: 2, importance: 'Core' },
  { id: 'K1-2', title: '常用逻辑用语', type: 'Section', stage: 'High', subject: 'Math', parentId: 'K1' },
  { id: 'K1-2-1', title: '充分条件与必要条件', type: 'Point', stage: 'High', subject: 'Math', parentId: 'K1-2', difficulty: 3, importance: 'Core' },
  
  { id: 'K2', title: '一元二次函数、方程和不等式', type: 'Chapter', stage: 'High', subject: 'Math', parentId: undefined },
  { id: 'K2-1', title: '基本不等式', type: 'Point', stage: 'High', subject: 'Math', parentId: 'K2', difficulty: 4, importance: 'Core' },

  // MIDDLE SCHOOL PHYSICS
  { id: 'P1', title: '机械运动', type: 'Chapter', stage: 'Middle', subject: 'Physics', parentId: undefined },
  { id: 'P1-1', title: '长度和时间的测量', type: 'Point', stage: 'Middle', subject: 'Physics', parentId: 'P1', difficulty: 1, importance: 'Core' },
  { id: 'P1-2', title: '运动的描述', type: 'Point', stage: 'Middle', subject: 'Physics', parentId: 'P1', difficulty: 2, importance: 'Core' },
  { id: 'P1-3', title: '运动的快慢', type: 'Point', stage: 'Middle', subject: 'Physics', parentId: 'P1', difficulty: 3, importance: 'Core' },

  // PRIMARY MATH
  { id: 'M1', title: '100以内的加法和减法', type: 'Chapter', stage: 'Primary', subject: 'Math', parentId: undefined },
  { id: 'M1-1', title: '两位数加两位数', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'M1', difficulty: 2, importance: 'Core' },
];

export const KnowledgeBase: React.FC = () => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>(INITIAL_NODES);
  const [activeStage, setActiveStage] = useState<'Primary' | 'Middle' | 'High'>('High');
  const [activeSubject, setActiveSubject] = useState<string>('Math');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['K1', 'K1-1']));
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<KnowledgeNode>>({});

  // --- LOGIC ---
  
  // Transform flat list to tree
  const treeData = useMemo(() => {
    const stageNodes = nodes.filter(n => n.stage === activeStage && n.subject === activeSubject);
    const nodeMap = new Map<string, KnowledgeNode>();
    
    // Create copies to avoid mutation issues during map set
    stageNodes.forEach(n => nodeMap.set(n.id, { ...n, children: [] }));
    
    const roots: KnowledgeNode[] = [];
    
    stageNodes.forEach(n => {
      if (n.parentId && nodeMap.has(n.parentId)) {
        nodeMap.get(n.parentId)!.children!.push(nodeMap.get(n.id)!);
      } else {
        roots.push(nodeMap.get(n.id)!);
      }
    });
    
    return roots;
  }, [nodes, activeStage, activeSubject]);

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedNodes);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedNodes(newSet);
  };

  const handleSelectNode = (node: KnowledgeNode) => {
    setSelectedNode(node);
    setIsEditing(false);
  };

  const handleDeleteNode = (id: string) => {
    if (confirm('确定要删除该知识点及其子节点吗？')) {
      // Simple recursive deletion simulation
      // In real app, check for children or database constraints
      const idsToDelete = new Set<string>();
      const collectIds = (currentId: string) => {
          idsToDelete.add(currentId);
          nodes.filter(n => n.parentId === currentId).forEach(child => collectIds(child.id));
      }
      collectIds(id);
      
      setNodes(nodes.filter(n => !idsToDelete.has(n.id)));
      if (selectedNode?.id === id) setSelectedNode(null);
    }
  };

  const handleAddNode = (parentId?: string) => {
    const newNode: KnowledgeNode = {
      id: `K-NEW-${Date.now()}`,
      title: '新知识点',
      type: parentId ? 'Point' : 'Chapter',
      stage: activeStage,
      subject: activeSubject,
      parentId: parentId,
      difficulty: 1,
      importance: 'Core'
    };
    setNodes([...nodes, newNode]);
    setExpandedNodes(new Set(expandedNodes).add(parentId || ''));
    
    // Auto select new node for editing
    setSelectedNode(newNode);
    setEditForm(newNode);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedNode && editForm.title) {
      setNodes(nodes.map(n => n.id === selectedNode.id ? { ...n, ...editForm } as KnowledgeNode : n));
      setSelectedNode({ ...selectedNode, ...editForm } as KnowledgeNode);
      setIsEditing(false);
    }
  };

  // Recursive Tree Component
  const TreeNode: React.FC<{ node: KnowledgeNode, level: number }> = ({ node, level }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;

    return (
      <div className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50 text-slate-700'
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => handleSelectNode(node)}
        >
          <button 
            className={`p-0.5 rounded hover:bg-black/5 ${!hasChildren ? 'invisible' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          
          {node.type === 'Chapter' && <Folder size={16} className="text-amber-500 fill-amber-500/20"/>}
          {node.type === 'Section' && <Folder size={16} className="text-blue-500 fill-blue-500/20"/>}
          {node.type === 'Point' && <FileText size={16} className="text-emerald-500"/>}
          
          <span className="text-sm font-medium flex-1 truncate">{node.title}</span>
          
          {node.type === 'Point' && node.difficulty && (
             <div className="flex gap-0.5">
               {Array.from({length: node.difficulty}).map((_, i) => (
                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
               ))}
             </div>
          )}
        </div>
        
        {isExpanded && node.children?.map(child => (
          <TreeNode key={child.id} node={child} level={level + 1} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">教研中心 Research & Knowledge</h1>
          <p className="text-slate-500 mt-1">学科知识图谱管理与题库建设基础。</p>
        </div>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex gap-2">
            {(['Primary', 'Middle', 'High'] as const).map(stage => (
                <button
                    key={stage}
                    onClick={() => setActiveStage(stage)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeStage === stage ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {stage === 'Primary' ? '小学' : stage === 'Middle' ? '初中' : '高中'}
                </button>
            ))}
         </div>
         <div className="h-8 w-px bg-slate-200"></div>
         <div className="flex gap-2">
            {(['Math', 'Physics', 'English', 'Chemistry'] as const).map(subject => (
                <button
                    key={subject}
                    onClick={() => setActiveSubject(subject)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        activeSubject === subject ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-white text-slate-600 border-transparent hover:bg-slate-50'
                    }`}
                >
                    {subject}
                </button>
            ))}
         </div>
         <div className="flex-1"></div>
         <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
                type="text" 
                placeholder="搜索知识点..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
         </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left: Tree View */}
        <div className="w-1/3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <GitBranch size={18} className="text-brand-600"/> 知识结构树
                </h3>
                <button 
                    onClick={() => handleAddNode()}
                    className="p-1.5 hover:bg-white rounded text-slate-600 border border-transparent hover:border-slate-200 transition-all"
                    title="添加章/模块"
                >
                    <Plus size={18}/>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {treeData.length > 0 ? (
                    treeData.map(node => <TreeNode key={node.id} node={node} level={0} />)
                ) : (
                    <div className="text-center py-12 text-slate-400 text-sm">
                        暂无该学科的知识点数据
                        <br/>
                        点击右上角 "+" 添加
                    </div>
                )}
            </div>
        </div>

        {/* Right: Detail View */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            {selectedNode ? (
                <>
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                                    selectedNode.type === 'Chapter' ? 'bg-amber-100 text-amber-700' :
                                    selectedNode.type === 'Section' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                    {selectedNode.type}
                                </span>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        className="text-2xl font-bold text-slate-900 border-b-2 border-brand-500 focus:outline-none bg-transparent"
                                        value={editForm.title || ''}
                                        onChange={e => setEditForm({...editForm, title: e.target.value})}
                                    />
                                ) : (
                                    <h2 className="text-2xl font-bold text-slate-900">{selectedNode.title}</h2>
                                )}
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                                ID: <span className="font-mono bg-slate-100 px-1 rounded">{selectedNode.id}</span>
                                {selectedNode.parentId && <span className="text-xs ml-2 text-slate-400">(Parent: {selectedNode.parentId})</span>}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                                    >
                                        <X size={20}/>
                                    </button>
                                    <button 
                                        onClick={handleSave}
                                        className="p-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                                    >
                                        <Check size={20}/>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => handleDeleteNode(selectedNode.id)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={20}/>
                                    </button>
                                    <button 
                                        onClick={() => { setEditForm(selectedNode); setIsEditing(true); }}
                                        className="p-2 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                                    >
                                        <Edit2 size={20}/>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        {isEditing ? (
                            <div className="space-y-4 max-w-lg">
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">节点类型</label>
                                    <select 
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                                        value={editForm.type}
                                        onChange={e => setEditForm({...editForm, type: e.target.value as any})}
                                    >
                                        <option value="Chapter">章 (Chapter)</option>
                                        <option value="Section">节 (Section)</option>
                                        <option value="Point">知识点 (Point)</option>
                                    </select>
                                </div>
                                
                                {editForm.type === 'Point' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">重要程度</label>
                                            <div className="flex gap-4">
                                                {['Core', 'Expanded', 'Optional'].map((imp) => (
                                                    <label key={imp} className="flex items-center gap-2 cursor-pointer">
                                                        <input 
                                                            type="radio" 
                                                            name="importance"
                                                            checked={editForm.importance === imp}
                                                            onChange={() => setEditForm({...editForm, importance: imp as any})}
                                                        />
                                                        <span className="text-sm text-slate-700">
                                                            {imp === 'Core' ? '核心' : imp === 'Expanded' ? '拓展' : '选修'}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">难度系数 (1-5)</label>
                                            <input 
                                                type="range" min="1" max="5" step="1"
                                                className="w-full accent-brand-600"
                                                value={editForm.difficulty || 1}
                                                onChange={e => setEditForm({...editForm, difficulty: Number(e.target.value) as any})}
                                            />
                                            <div className="flex justify-between text-xs text-slate-400 px-1">
                                                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">详细描述 / 教学目标</label>
                                    <textarea 
                                        rows={5}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                                        value={editForm.description || ''}
                                        onChange={e => setEditForm({...editForm, description: e.target.value})}
                                    ></textarea>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">基本属性</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">学段</span>
                                                <span className="font-medium text-slate-900">{selectedNode.stage}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">学科</span>
                                                <span className="font-medium text-slate-900">{selectedNode.subject}</span>
                                            </div>
                                            {selectedNode.type === 'Point' && (
                                                <>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">重要性</span>
                                                        <span className={`font-bold ${
                                                            selectedNode.importance === 'Core' ? 'text-brand-600' : 'text-slate-600'
                                                        }`}>
                                                            {selectedNode.importance === 'Core' ? '核心考点' : 
                                                             selectedNode.importance === 'Expanded' ? '拓展延伸' : '选修了解'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-slate-500">难度</span>
                                                        <div className="flex gap-1">
                                                            {Array.from({length: 5}).map((_, i) => (
                                                                <Star 
                                                                    key={i} size={14} 
                                                                    className={i < (selectedNode.difficulty || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-center items-center text-center">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">关联题目</h4>
                                        <p className="text-3xl font-bold text-slate-900">0</p>
                                        <p className="text-xs text-slate-400 mt-1">题库尚未关联</p>
                                        <button disabled className="mt-3 text-xs text-brand-400 border border-brand-100 px-3 py-1 rounded bg-white cursor-not-allowed">
                                            + 添加题目 (Coming Soon)
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-2">详细描述</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 border border-slate-100 rounded-lg min-h-[100px]">
                                        {selectedNode.description || '暂无描述。点击编辑按钮添加教学目标或知识点详解。'}
                                    </p>
                                </div>

                                {selectedNode.type !== 'Point' && (
                                    <div className="border-t border-slate-100 pt-6">
                                        <button 
                                            onClick={() => handleAddNode(selectedNode.id)}
                                            className="w-full py-3 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 hover:border-brand-300 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus size={18}/> 在 "{selectedNode.title}" 下添加子节点
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                    <GitBranch size={48} className="mb-4 opacity-50"/>
                    <p>请在左侧选择一个知识节点查看详情</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};